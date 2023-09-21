import { JobTypeEnum, LoadBalanceTypeEnum, PlanTypeEnum, ScheduleTypeEnum, TriggerTypeEnum } from "@/types/console-enums";
import { NormalPlanInfoDTO, PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";


/**
 * 生成空白任务
 */
export function createEmptyPlan(): PlanDTO {
    return  {
        planId: 'plan_' + Date.now(),
        name: '',
        description: '',
        planType: PlanTypeEnum.WORKFLOW.value,
        triggerType: TriggerTypeEnum.SCHEDULE.value,
        scheduleOption: {
            scheduleType: ScheduleTypeEnum.FIXED_DELAY.value
        },
        workflow: [ createEmptyJob() ],
        currentVersion: '1',
        recentlyVersion: '1',
        dagData: {
            nodes: new Map()
        }
    };
}


/**
 * 生成空白任务
 */
export function createEmptyNormalPlan(): NormalPlanInfoDTO {
    return  {
        planId: 'plan_' + Date.now(),
        name: '',
        description: '',
        triggerType: TriggerTypeEnum.SCHEDULE.value,
        scheduleOption: {
            scheduleType: ScheduleTypeEnum.FIXED_DELAY.value
        },
        type: "UNKNOWN",
        attributes: new Map(),
        dispatchOption: {
            loadBalanceType: LoadBalanceTypeEnum.RANDOM.value
        },
        executorName: ''
    };
}


/**
 * 生成空白作业
 * @param id 作业 ID，可以不传
 * @returns 
 */
export function createEmptyJob(id?: string): WorkflowJobDTO {
    return {
        type: JobTypeEnum.STANDALONE.value,
        attributes: {},
        retryOption: {
            retry: 0,
            retryInterval: 0
        },
        dispatchOption: {
            loadBalanceType: LoadBalanceTypeEnum.ROUND_ROBIN.value,
            cpuRequirement: 0,
            ramRequirement: 0,
            tagFilters: []
        },
        executorName: '',
        id: id ? id : Date.now() + '',
        name: '空白作业',
        description: '',
        children: [],
        triggerType: TriggerTypeEnum.SCHEDULE.value,
        continueWhenFail: false,
    };
}


/**
 * 新增一个空白作业节点
 * @param plan DAG 任务
 * @param postion 节点所在位置
 * @returns 新增的作业
 */
export function addEmptyJob(plan: PlanDTO, postion: { x: number, y: number}): WorkflowJobDTO {
    const job: WorkflowJobDTO = createEmptyJob();

    plan.workflow?.push(job);
    plan.dagData?.nodes.set(job.id, {
        ...postion,
        w: 180,
        h: 40
    });
    return job;
}


/**
 * 复制作业节点
 * @param plan DAG 任务
 * @param jobId 被复制的作业 ID
 */
export function copyJob(plan: PlanDTO, jobId: string): WorkflowJobDTO {
    const job = plan.workflow?.filter(j => j.id === jobId)[0] as WorkflowJobDTO;
    const newJob = { ...job };
    newJob.id = Date.now() + '';
    newJob.children = [];
    plan.workflow?.push(newJob);

    const jobDagData = plan.dagData.nodes.get(jobId);
    plan.dagData?.nodes.set(newJob.id, {
        x: jobDagData?.x as number + 20,
        y: jobDagData?.y as number + 20,
        w: 180,
        h: 40
    });

    return newJob;
}


/**
 * 更新作业
 * @param plan DAG 任务
 * @param newJob 新作业数据
 */
export function updateJob(plan: PlanDTO, newJob: WorkflowJobDTO) {
    const idx = plan.workflow?.findIndex(j => j.id === newJob.id) as number;
    if (idx >= 0) {
        plan.workflow?.splice(idx, 1, newJob);
    } else {
        plan.workflow?.push(newJob);
    }
}


/**
 * 删除作业节点
 * @param plan DAG 任务
 * @param jobId 被删除的作业 ID
 */
export function removeJob(plan: PlanDTO, jobId: string) {
    // 移除作业节点
    plan.workflow = plan.workflow?.filter(j => j.id !== jobId);
    plan.dagData.nodes.delete(jobId);
    // 从父节点移除子节点关联
    plan.workflow?.forEach(job => {
        const idx = job.children?.indexOf(jobId) as number;
        if (idx < 0) {
            return;
        }
        
        job.children?.splice(idx);
        console.log(`作业 ${jobId} 从 ${job.id} 的子节点移除`);
    });
}


/**
 * 删除某个作业的所有子作业
 * @param plan DAG 任务
 * @param jobId 被删除子作业的作业 ID
 * @returns 
 */
export function removeChildJob(plan: PlanDTO, jobId: string): string[] {
    // 先找到节点
    const parentJob = plan.workflow?.filter(j => j.id === jobId)[0];
    if (!parentJob || !parentJob.children) {
        return [];
    }

    // 遍历子节点并移除
    const children = [...parentJob.children];
    return children.flatMap(childJobId => removeChildJobAndSelf(plan, childJobId));
}


/**
 * 删除某个作业和其所有子作业
 * @param plan DAG 任务
 * @param jobId 被删除子作业的作业 ID
 * @returns 
 */
function removeChildJobAndSelf(plan: PlanDTO, jobId: string): string[] {
    // 先找到节点
    const parentJob = plan.workflow?.filter(j => j.id === jobId)[0];
    if (!parentJob) {
        return [];
    }

    const removedJobIds = []

    // 遍历子节点并移除
    if (parentJob.children) {
        parentJob.children?.forEach(childJobId => removeChildJobAndSelf(plan, childJobId).forEach(i => removedJobIds.push(i)));
    }

    // 移除当前节点
    removeJob(plan, jobId);
    removedJobIds.push(jobId);
1
    return removedJobIds;
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

