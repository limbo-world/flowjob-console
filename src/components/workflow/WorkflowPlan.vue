<template>


    <div class="workerflow-plan-dag">
        <div :id="x6ContainerId" class="workflow-x6-container">
        </div>

        <graph-context-menu ref="contextMenu" :menus="contextMenuData"></graph-context-menu>
    </div>
</template>


<script setup lang="ts">
import { computed, onMounted, Ref, ref, toRef } from "vue";
import { Cell, Graph } from "@antv/x6";
import { Node } from "@antv/x6/lib/model";
import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { useX6Graph, autoLayout } from "@/components/workflow/X6GraphIntergration";
import { useGraphContextMenu } from "@/components/workflow/GraphContextMenuIntergration";
import GraphContextMenu from "@/components/workflow/GraphContextMenu.vue"


const props = defineProps<{
    plan: PlanDTO
}>();

const plan: Ref<PlanDTO> = toRef(props, 'plan');
const x6ContainerId = computed<string>(() => 'x6Container_' + plan.value?.planId);
const { x6Graph } = useX6Graph(x6ContainerId.value);
const contextMenu = ref();
const { contextMenuData } = useGraphContextMenu(x6Graph, contextMenu);

onMounted(() => {
    // 初始化作业节点
    const jobNodeMetas: Node.Metadata[] = [];
    const jobNodeMetaMap: Map<String, Node.Metadata> = new Map();
    const jobEdgeMetas: Node.Metadata[] = [];

    // 先生成节点
    plan.value?.workflow?.forEach((job: WorkflowJobDTO) => {
        const jobNodeMeta = {
            "id": job.id,
            "shape": "dag-node",
            "x": 290,
            "y": 110,
            "data": {
                "label": job.name,
                "status": "running"
            },
            "ports": [ ]
        };
        jobNodeMetas.push(jobNodeMeta);
        jobNodeMetaMap.set(job.id, jobNodeMeta);
    });

    // 再生成连线，遍历所有节点
    plan.value?.workflow?.forEach((job: WorkflowJobDTO) => {
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
    const cells: Cell[] = [];
    jobNodeMetas.forEach(m => cells.push(x6Graph.value?.createNode(m) as Cell));
    jobEdgeMetas.forEach(m => cells.push(x6Graph.value?.createEdge(m) as Cell));
    x6Graph.value?.resetCells(cells);

    // 自适应布局
    autoLayout(x6Graph?.value as Graph, 'TB');  
    (x6Graph?.value as Graph).centerContent();



})

</script>


<style scoped lang="scss">

.workerflow-plan-dag {
    position: relative;
    height: 100%;
}

.workflow-x6-container {
    width: 100%;
    height: 100%;

    .node {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #c2c8d5;
        border-left: 4px solid #5F95FF;
        border-radius: 4px;
        box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
    }
    .node img {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        margin-left: 8px;
    }
    .node .label {
        display: inline-block;
        flex-shrink: 0;
        width: 104px;
        margin-left: 8px;
        color: #666;
        font-size: 12px;
    }
    .node .status {
        flex-shrink: 0;
    }
    .node.success {
        border-left: 4px solid #52c41a;
    }
    .node.failed {
        border-left: 4px solid #ff4d4f;
    }
    .node.running .status img {
        animation: spin 1s linear infinite;
    }
    .x6-node-selected .node {
        border-color: #1890ff;
        border-radius: 2px;
        box-shadow: 0 0 0 4px #d4e8fe;
    }
    .x6-node-selected .node.success {
        border-color: #52c41a;
        border-radius: 2px;
        box-shadow: 0 0 0 4px #ccecc0;
    }
    .x6-node-selected .node.failed {
        border-color: #ff4d4f;
        border-radius: 2px;
        box-shadow: 0 0 0 4px #fedcdc;
    }
    .x6-edge:hover path:nth-child(2){
        stroke: #1890ff;
        stroke-width: 1px;
    }

    .x6-edge-selected path:nth-child(2){
        stroke: #1890ff;
        stroke-width: 1.5px !important;
    }

    @keyframes running-line {
        to {
            stroke-dashoffset: -1000;
        }
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>