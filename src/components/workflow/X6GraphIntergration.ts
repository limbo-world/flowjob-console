import { ref, defineComponent, onMounted } from "vue";
import { register } from "@antv/x6-vue-shape";
import DagNode from "@/views/test/DagNode1.vue";
import { Graph, Path } from "@antv/x6";
import { Selection } from "@antv/x6-plugin-selection";

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
    const x6Graph = ref<Graph>();
    onMounted(() => {
        // 初始化 x6 画布
        x6Graph.value = new Graph({
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
                    return x6Graph.value?.createEdge({
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
        x6Graph.value.use(new Selection({
            enabled: true,
            multiple: true,
            rubberEdge: true,
            rubberNode: true,
            modifiers: 'shift',
            rubberband: true,
        }));

        // 节点连接时的回调
        x6Graph.value.on('edge:connected', ({ edge }) => {
            edge.attr({
                line: {
                    strokeDasharray: '',
                },
            })
        });

        // 节点数据改变时的回调
        x6Graph.value.on('node:change:data', ({ node }) => {
            const edges = x6Graph.value?.getIncomingEdges(node)
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
        x6Graph
    }

}