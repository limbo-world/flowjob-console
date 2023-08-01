import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { Edge, Graph } from "@antv/x6";
import { Ref, onMounted } from "vue";



export function useX6GraphEdge(params: {
    planRef: Ref<PlanDTO | undefined>,
    x6GraphRef: Ref<Graph | undefined>,
}) {

    const { planRef, x6GraphRef } = params;

    onMounted(() => {
    
        // 连线建立事件
        x6GraphRef.value?.on('edge:connected', ({ edge }) => onEdgeConnected(planRef.value as PlanDTO, edge))

        // TODO 连线单选事件，添加删除连线按钮到 contextMenu
        x6GraphRef.value?.on('edge:click', ({ edge }) => edge.attr('line/stroke', '#FF0000'))
    
    });


}



/**
 * x6 新增连线时，记录节点的父子关系到 plan
 * @param plan 任务
 * @param edge 新增的连线
 */
function onEdgeConnected(plan: PlanDTO, edge: Edge) {
    const source = edge.source as Edge.TerminalCellLooseData;
    const target = edge.target as Edge.TerminalCellLooseData;

    let parent!: WorkflowJobDTO;
    let child!: WorkflowJobDTO;
    plan.workflow?.forEach(job => {
        if (job.id === source.cell) {
            parent = job;
        }
        if (job.id === target.cell) {
            child = job;
        }
    });

    if (parent && child) {
        parent.children?.push(child?.id)
        console.log(`作业 ${child.id} 添加到 ${parent.id} 的子节点`)
    }
}