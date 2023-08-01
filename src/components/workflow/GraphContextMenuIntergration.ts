
import { ComponentPublicInstance, onMounted, Ref, toRefs } from "vue";
import { Graph } from "@antv/x6";
import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { JobTypeEnum, LoadBalanceTypeEnum, TriggerTypeEnum } from "@/types/console-enums";
import { autoLayout, generateNodesAndEdges } from "./X6GraphIntergration";
import GraphContextMenu from "./menu/GraphContextMenu.vue"
import GraphNavMenu from "./menu/GraphNavMenu.vue"


export function useGraphContextMenu(params: {
    x6GraphRef: Ref<Graph | undefined>,
    contextMenuRef: Ref<ComponentPublicInstance<typeof GraphContextMenu>>,
    navMenuRef: Ref<ComponentPublicInstance<typeof GraphNavMenu>>,
    planRef: Ref<PlanDTO | undefined>,
    refreshPlanDAG: (jobs: WorkflowJobDTO[]) => void
}) {

    const { x6GraphRef, contextMenuRef, navMenuRef, planRef } = params;

    // 菜单数据
    const contextMenuData = [
        {
            menuId: 'add-node',
            menuIcon: 'CirclePlusFilled',
            menuName: '新增节点',
            menuCallback: () => {
                const plan = planRef?.value as PlanDTO;
                const newJob = addEmptyNode(plan, contextMenuRef?.value.getPositionInGraph());
                const { nodes } = generateNodesAndEdges(x6GraphRef.value as Graph, plan.dagData, [newJob]);
                x6GraphRef.value?.addNodes(nodes);
                contextMenuRef.value?.hideContextMenu();
            }
        },
        {
            menuId: 'centerContent',
            menuIcon: 'Aim',
            menuName: '居中',
            menuCallback: () => {
                (x6GraphRef?.value as Graph)?.centerContent();
                contextMenuRef.value?.hideContextMenu();
            }
        },
        {
            menuId: 'autoLayout',
            menuIcon: 'Grid',
            menuName: '自适应布局',
            menuCallback: () => {
                autoLayout(x6GraphRef?.value as Graph, planRef, 'TB');
                contextMenuRef.value?.hideContextMenu();
            }
        },
    ];


    onMounted(() => {
        // 鼠标右键，菜单出现
        x6GraphRef.value?.on('blank:contextmenu', ({ e, x, y}) => {
            console.log('画布右键单机', e, x, y);
            const contextMenu = contextMenuRef.value;
            if (!contextMenu) {
                return;
            }


            contextMenu.showContextMenu({x: e.clientX, y: e.clientY}, contextMenuData);
            contextMenu.setPositionInGraph({x, y});
        });

        // 注册其他事件：关闭菜单
        const closeMenuEvents = [
            'cell:mousedown',
            'node:mousedown',
            'node:port:mousedown',
            'edge:mousedown',
            'blank:mousedown'
        ];
        closeMenuEvents.forEach(e => x6GraphRef.value?.on(e, () => {
            contextMenuRef.value?.hideContextMenu();
        }));

        // 设置导航菜单
        navMenuRef.value.updateMenuItems(contextMenuData);
    });


    return toRefs({
        contextMenuData
    })
}


/**
 * 新增一个空白作业节点
 * @param postion 节点所在位置
 * @returns 新增的作业
 */
function addEmptyNode(plan: PlanDTO, postion: { x: number, y: number}) {
    const id = Date.now() + '';
    const job = {
        type: JobTypeEnum.NORMAL,
        attributes: {},
        retryOption: {
            retry: 0,
            retryInterval: 0
        },
        dispatchOption: {
            loadBalanceType: LoadBalanceTypeEnum.ROUND_ROBIN,
            cpuRequirement: -1,
            ramRequirement: -1,
            tagFilters: []
        },
        executorName: '',
        id: id,
        name: '空白作业',
        description: '',
        children: [],
        triggerType: TriggerTypeEnum.SCHEDULE,
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


