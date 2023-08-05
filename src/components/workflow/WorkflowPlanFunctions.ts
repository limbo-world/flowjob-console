import { JobTypeEnum, LoadBalanceTypeEnum, TriggerTypeEnum } from "@/types/console-enums";
import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";




/**
 * 新增一个空白作业节点
 * @param plan DAG 任务
 * @param postion 节点所在位置
 * @returns 新增的作业
 */
export function addEmptyNode(plan: PlanDTO, postion: { x: number, y: number}): WorkflowJobDTO {
    const id = Date.now() + '';
    const job: WorkflowJobDTO = {
        type: JobTypeEnum.NORMAL.value,
        attributes: {},
        retryOption: {
            retry: 0,
            retryInterval: 0
        },
        dispatchOption: {
            loadBalanceType: LoadBalanceTypeEnum.ROUND_ROBIN.value,
            cpuRequirement: -1,
            ramRequirement: -1,
            tagFilters: []
        },
        executorName: '',
        id: id,
        name: '空白作业',
        description: '',
        children: [],
        triggerType: TriggerTypeEnum.SCHEDULE.value,
        continueWhenFail: false,
    };

    plan.workflow?.push(job);
    plan.dagData?.nodes.set(id, {
        ...postion,
        w: 180,
        h: 40
    });
    return job;
}


/**
 * 将子作业添加到父作业下
 * @param plan DAG 任务
 * @param parentJobId 父作业 ID
 * @param childJobId 子作业 ID
 */
export function addChild(plan: PlanDTO, parentJobId: string, childJobId: string) {
    let parent!: WorkflowJobDTO;
    let child!: WorkflowJobDTO;
    plan.workflow?.forEach(job => {
        if (job.id === parentJobId) {
            parent = job;
        }
        if (job.id === childJobId) {
            child = job;
        }
    });

    if (parent && child) {
        parent.children?.push(child?.id)
        console.log(`作业 ${child.id} 添加到 ${parent.id} 的子节点`)
    }
}


/**
 * 将子作业从父作业下移除
 * @param plan DAG 任务
 * @param parentJobId 父作业 ID
 * @param childJobId 子作业 ID
 */
export function removeChild(plan: PlanDTO, parentJobId: string, childJobId: string) {
    let parent!: WorkflowJobDTO;
    let child!: WorkflowJobDTO;
    plan.workflow?.forEach(job => {
        if (job.id === parentJobId) {
            parent = job;
        }
        if (job.id === childJobId) {
            child = job;
        }
    });

    if (parent && parent.children && child) {
        parent.children.splice(parent.children.indexOf(child?.id))
        console.log(`作业 ${child.id} 从 ${parent.id} 的子节点移除`)
    }
}