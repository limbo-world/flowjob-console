<template>

    <div class="workerflow-plan-dag">
        <div :id="x6ContainerId" class="workflow-x6-container">
        </div>

        <graph-context-menu ref="contextMenuRef"></graph-context-menu>
        <graph-nav-menu ref="navMenuRef"></graph-nav-menu>
    </div>
</template>


<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { Graph } from "@antv/x6";
import { PlanDagData, PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { useX6Graph, autoLayout, refreshDAGJobNodes } from "@/components/workflow/X6GraphIntergration";

import { useGraphContextMenu } from "./GraphContextMenuIntergration";
import { useX6GraphEdge } from "./X6GraphEdgeIntergration";
import GraphContextMenu from "./menu/GraphContextMenu.vue"
import GraphNavMenu from './menu/GraphNavMenu.vue'


const plan: Ref<PlanDTO | undefined> = ref();
const x6ContainerId = computed<string>(() => 'x6Container_' + plan.value?.planId);
const { x6GraphRef } = useX6Graph(x6ContainerId.value, plan);
const contextMenuRef = ref();
const navMenuRef = ref();
const { contextMenuData } = useGraphContextMenu({
    x6GraphRef, 
    contextMenuRef, 
    navMenuRef,
    planRef: plan, 
    refreshPlanDAG: (jobs: WorkflowJobDTO[]) => refreshDAGJobNodes(
        x6GraphRef.value as Graph,
        plan?.value?.dagData as PlanDagData,
        jobs
    )
});

useX6GraphEdge({
    planRef: plan,
    x6GraphRef,
});


/**
 * 更新任务
 */
function updatePlan(p: PlanDTO) {
    // 为数据赋值
    plan.value = p;

    // 刷新 DAG
    refreshDAGJobNodes(
        x6GraphRef.value as Graph,
        plan.value.dagData as PlanDagData,
        plan.value.workflow as WorkflowJobDTO[]
    );

    // 自适应布局
    autoLayout(x6GraphRef?.value as Graph, plan, 'TB');  
    (x6GraphRef?.value as Graph)?.centerContent();

    console.log(plan)
}


/**
 * 获取任务
 */
function getPlan(): PlanDTO {
    return plan.value as PlanDTO;
}


// 组件对外暴露的函数
defineExpose({
    updatePlan,
    getPlan
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