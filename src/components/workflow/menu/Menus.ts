import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api"
import { Graph } from "@antv/x6"
import { ComponentPublicInstance, Ref } from "vue"
import GraphContextMenu from "./GraphContextMenu.vue"
import GraphNavMenu from "./GraphNavMenu.vue"
import { JobTypeEnum, LoadBalanceTypeEnum, TriggerTypeEnum } from "@/types/console-enums"


/** 
 * 菜单项
 */
export interface MenuItem {
    menuId: string,
    menuIcon: string,
    menuName: string,
    menuCallback: (id: string) => void
}


/**
 * 集成菜单功能时的参数
 */
export interface MenuIntegerationArgs {
    x6GraphRef: Ref<Graph | undefined>,
    contextMenuRef: Ref<ComponentPublicInstance<typeof GraphContextMenu>>,
    navMenuRef: Ref<ComponentPublicInstance<typeof GraphNavMenu>>,
    planRef: Ref<PlanDTO | undefined>,
    refreshPlanDAG: (jobs: WorkflowJobDTO[]) => void
}



/**
 * 新增一个空白作业节点
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