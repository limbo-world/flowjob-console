<template>

    <div class="workerflow-plan-dag">
        <div :id="x6ContainerId" class="workflow-x6-container"></div>

        <graph-context-menu ref="contextMenuRef" ></graph-context-menu>
        <graph-nav-menu ref="navMenuRef"></graph-nav-menu>

        <workflow-drawer ref="drawerRef" @job-change="onJobUpdate"></workflow-drawer>
    </div>
</template>


<script setup lang="ts">
import { onMounted, Ref, ref, toRef, watch } from "vue";
import { Graph } from "@antv/x6";
import { PlanDagData, PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { useX6Graph, autoLayout, refreshDAGJobNodes, updateDAGNode } from "@/components/workflow/X6GraphIntergration";

import GraphContextMenu from "./menu/GraphContextMenu.vue"
import GraphNavMenu from './menu/GraphNavMenu.vue'
import WorkflowDrawer from './drawer/WorkflowDrawer.vue'
import { X6GraphControlIntegerationArgs } from "./menu/Menus";
import { initX6GraphControl } from "./X6GraphControlIntergration";
import { updateJob } from "./WorkflowPlanFunctions";



// v-model:plan
const plan: Ref<PlanDTO | undefined> = ref();
const emitPlanUpdate = defineEmits<{
    (e: 'onPlanUpdate', val: PlanDTO): void
}>();
watch(plan, (newValue, oldValue) => {
    console.log('plan 更新', newValue, oldValue);
    if (newValue) {
        emitPlanUpdate('onPlanUpdate', newValue);
    }
}, { deep: true })

// 属性
const props = defineProps<{ 
  readonly: boolean,
}>()

const readonly = toRef(props, 'readonly');
const mounted = ref(false);
const x6ContainerId = ref(`x6Container_${Date.now()}`);
const x6GraphRef = ref<Graph>();
const contextMenuRef = ref();
const navMenuRef = ref();
const drawerRef = ref();


onMounted(() => {
    mounted.value = true;
    initX6();
});


/**
 * 初始化 x6 画布
 */
function initX6() {
    if (!mounted.value || !plan.value) {
        return;
    }

    // 防止重复初始化
    if (!x6GraphRef.value) {
        const { x6Graph } = useX6Graph(x6ContainerId.value, plan);
        x6GraphRef.value = x6Graph;
    }

    // 刷新 DAG
    console.log('刷新 DAG 视图');
    refreshDAGJobNodes(
        x6GraphRef.value,
        plan.value?.dagData as PlanDagData,
        plan.value?.workflow as WorkflowJobDTO[]
    );

    // 自适应布局 & 居中
    autoLayout(x6GraphRef.value, plan, 'TB');  
    x6GraphRef.value.centerContent();

    // 注册 x6 控制器
    debugger
    if (!readonly.value) {
        initX6GraphControl({
            x6GraphRef, 
            contextMenuRef, 
            navMenuRef,
            drawerRef,
            planRef: plan
        });
    }
}


/**
 * 更新任务
 */
function refresh(p: PlanDTO) {
    if (p) {
        plan.value = p;
    }
    initX6();
}


/**
 * 作业编辑更新后，需更新作业、更新 DAG
 */
function onJobUpdate(job: WorkflowJobDTO) {
    console.log('作业更新', job);

    const planDTO = plan.value as PlanDTO;
    const graph = x6GraphRef.value as Graph;
    if (!planDTO || !graph) {
        return;
    }

    updateJob(planDTO, job);
    updateDAGNode(graph, [job]);

    console.log('更新后', plan.value);
}


// 组件对外暴露的函数
defineExpose({
    refresh
})
</script>


<style scoped lang="scss">

.workerflow-plan-dag {
    position: relative;
    width: 100%;
    height: 400px;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
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
</style>./menu/GraphContextMenuIntergration./EdgeMenuIntergration./menu/GraphMenuIntergration./menu/X6GraphControlIntergration