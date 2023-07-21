import { ref, onMounted, Ref } from "vue";
import { register } from "@antv/x6-vue-shape";
import dagre from '@dagrejs/dagre'
import DagNode from "@/components/workflow/JobNode.vue";
import { Edge, Graph, Path, Node, Cell } from "@antv/x6";
import { Selection } from "@antv/x6-plugin-selection";
import { PlanDTO, PlanDagData, WorkflowJobDTO } from "@/types/swagger-ts-api";

export function useX6Graph(graphContainerId: string) {
    console.log('x6 容器 ID ' + graphContainerId);

    // 注册节点组件
    register({
        shape: 'dag-node',
        width: 180,
        height: 36,
        component: DagNode,
        ports: {
            groups: {
                top: {
                    position: 'top',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
                bottom: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
            },
        },
    });

    // 注册连线组件
    Graph.registerEdge('dag-edge', {
        inherit: 'edge',
        attrs: {
            line: {
                stroke: '#C2C8D5',
                strokeWidth: 1,
                targetMarker: null,
            },
        },
    }, true)

    // 注册连接线端点（剪头）组件
    Graph.registerConnector('algo-connector', (s, e) => {
        const offset = 4
        const deltaY = Math.abs(e.y - s.y)
        const control = Math.floor((deltaY / 3) * 2)

        const v1 = { x: s.x, y: s.y + offset + control }
        const v2 = { x: e.x, y: e.y - offset - control }

        return Path.normalize(
            `
        M ${s.x} ${s.y}
        L ${s.x} ${s.y + offset}
        C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
        L ${e.x} ${e.y}
        `,
        )
    }, true,)


    // 声明 x6 画布，并在组件创建后初始化
    const x6GraphRef = ref<Graph>();
    onMounted(() => {
        // 初始化 x6 画布
        x6GraphRef.value = new Graph({
            container: document.getElementById(graphContainerId)!,
            panning: {
                enabled: true,
                eventTypes: ['leftMouseDown', 'mouseWheel'],
            },
            mousewheel: {
                enabled: true,
                modifiers: 'ctrl',
                factor: 1.1,
                maxScale: 1.5,
                minScale: 0.5,
            },
            highlighting: {
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: '#fff',
                            stroke: '#31d0c6',
                            strokeWidth: 4,
                        },
                    },
                },
            },
            connecting: {
                snap: true,
                allowBlank: false,
                allowLoop: false,
                highlight: true,
                connector: 'algo-connector',
                connectionPoint: 'anchor',
                anchor: 'center',
                validateMagnet({ magnet }) {
                    return magnet.getAttribute('port-group') !== 'top'
                },
                createEdge() {
                    return x6GraphRef.value?.createEdge({
                        shape: 'dag-edge',
                        attrs: {
                            line: {
                                strokeDasharray: '5 5',
                            },
                        },
                        zIndex: -1,
                    })
                },
            }
        });

        // 启用 x6 功能
        x6GraphRef.value.use(new Selection({
            enabled: true,
            multiple: true,
            rubberEdge: true,
            rubberNode: true,
            modifiers: 'shift',
            rubberband: true,
        }));

        // 节点连接时的回调
        x6GraphRef.value.on('edge:connected', ({ edge }) => {
            edge.attr({
                line: {
                    strokeDasharray: '',
                },
            })
        });

        // 节点数据改变时的回调
        x6GraphRef.value.on('node:change:data', ({ node }) => {
            const edges = x6GraphRef.value?.getIncomingEdges(node)
            const { status } = node.getData() as NodeStatus
            edges?.forEach((edge) => {
                if (status === 'running') {
                    edge.attr('line/strokeDasharray', 5)
                    edge.attr('line/style/animation', 'running-line 30s infinite linear')
                } else {
                    edge.attr('line/strokeDasharray', '')
                    edge.attr('line/style/animation', '')
                }
            })
        });
    })

    return {
        x6GraphRef
    }
}


/**
 * 自适应布局
 * @param graph x6 画布
 * @param plan 任务，自适应布局后会更新任务中的 DAG 坐标信息
 * @param dir 布局方向，取值有四个：LR RL TB BT
 */
export function autoLayout(graph: Graph, planRef: Ref<PlanDTO|undefined>, dir: string) {
    if (!graph) {
        return;
    }

    // 初始化 dagre 画布
    const g = new dagre.graphlib.Graph();
    g.setGraph({ 
        rankdir: dir
    });
    g.setDefaultEdgeLabel(() => ({}));

    // 设置节点到 dagre 画布
    const nodes = graph.getNodes()
    nodes.forEach(node => g.setNode(node.id, node.size()));

    // 设置边到 dagre 画布
    const edges: Edge[] = graph.getEdges()
    edges.forEach((edge) => {
        const source = edge.source as Edge.TerminalCellLooseData
        const target = edge.target as Edge.TerminalCellLooseData
        g.setEdge(source.cell as string, target.cell as string)
    });

    // 计算布局
    dagre.layout(g);

    // 更新 X6 图形位置和大小
    g.nodes().forEach((id) => {
        const node = graph.getCellById(id) as Node;
        if (node) {
            const n = g.node(id)
            node.position(n.x, n.y)
            
            // 更新 Plan 中的 DAG 信息
            const prevNodeDagData = planRef.value?.dagData?.nodes.get(id);
            planRef.value?.dagData?.nodes.set(id, { 
                x: n.x, 
                y: n.y, 
                w: prevNodeDagData?.w || 180, 
                h: prevNodeDagData?.h || 40
            });
        }
    });

    graph.resetCells([ ...nodes, ...edges ])
}


/**
 * 根据作业信息，生成 x6 节点、边
 * @param x6Graph x6 画布
 * @param dagData DAG 坐标信息
 * @param jobs 作业列表
 * @returns 返回 x6 节点、边数组
 * {
 *  nodes: Cell[],
 *  edges: Cell[],
 * }
 */
export function generateNodesAndEdges(x6Graph: Graph, dagData: PlanDagData, jobs: WorkflowJobDTO[]) {
    // 初始化作业节点
    const jobNodeMetas: Node.Metadata[] = [];
    const jobNodeMetaMap: Map<String, Node.Metadata> = new Map();
    const jobEdgeMetas: Node.Metadata[] = [];

    // 先生成节点
    jobs?.forEach((job: WorkflowJobDTO) => {
        const nodeDagData = dagData?.nodes.get(job.id);
        const jobNodeMeta = {
            "id": job.id,
            "shape": "dag-node",
            "x": nodeDagData?.x || 0,
            "y": nodeDagData?.y || 0,
            "data": {
                "label": job.name,
                "status": "running"
            },
            "ports": [ ]
        };
        jobNodeMetas.push(jobNodeMeta);
        jobNodeMetaMap.set(job.id ? job.id : '', jobNodeMeta);
    });

    // 再生成连线，遍历所有节点
    jobs.forEach((job: WorkflowJobDTO) => {
        // 没有子节点，则无需生成连线
        if (job?.children?.length && job?.children?.length <= 0) {
            return;
        }

        // 找到节点元信息
        let jobNodeMeta = jobNodeMetaMap.get(job.id);
        if (!jobNodeMeta) {
            return;
        }

        // 遍历子节点，生成连线、添加 ports
        job.children?.forEach((childJobId: string) => {
            // 找到子节点元信息
            const childJobNodeMeta = jobNodeMetaMap.get(childJobId);
            if (!childJobNodeMeta) {
                return;
            }

            // 添加父、子节点 ports
            const edgeId = `${job.id}-${childJobId}`;
            jobNodeMeta?.ports?.push({
                id: edgeId,
                group: 'bottom' // 左右布局，所以父节点 port 分组在右侧
            });
            childJobNodeMeta?.ports?.push({
                id: edgeId,
                group: 'top' // 左右布局，所以子节点 port 分组在左侧
            });

            // 添加连线
            jobEdgeMetas.push({
                "id": edgeId,
                "shape": "dag-edge",
                "source": {
                    "cell": job?.id,
                    "port": edgeId
                },
                "target": {
                    "cell": childJobId,
                    "port": edgeId
                },
                "zIndex": 0
            });
        });
    });

    // 生成 x6 流程图的 Cell 元素，并重绘 x6 组件
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    jobNodeMetas.forEach(m => nodes.push(x6Graph.createNode(m) as Node));
    jobEdgeMetas.forEach(m => edges.push(x6Graph.createEdge(m) as Edge));

    return { nodes, edges };
}


/**
 * 刷新作业的 DAG 节点
 * @param x6Graph x6 画布
 * @param dagData 任务的 DAG 数据
 * @param jobs 作业列表
 */
export function refreshDAGJobNodes(x6Graph: Graph, dagData: PlanDagData, jobs: WorkflowJobDTO[]) {
    const { nodes, edges } = generateNodesAndEdges(x6Graph, dagData, jobs);

    // 生成 x6 流程图的 Cell 元素，并重绘 x6 组件
    const cells: Cell[] = [ ...nodes, ...edges ];
    x6Graph.resetCells(cells);
}