import { PlanDTO } from "@/types/swagger-ts-api";
import { MenuItem, MenuIntegerationArgs } from "./Menus";
import { autoLayout, generateNodesAndEdges } from "../X6GraphIntergration";
import { Graph } from "@antv/x6";
import { onMounted } from "vue";
import { addEmptyNode } from "../WorkflowPlanFunctions";


export function useBlankContextMenu(params: MenuIntegerationArgs) {

    // 参数展开
    const { x6GraphRef, contextMenuRef, navMenuRef, planRef } = params;
    const contextMenuItems = getDefaultContextMenuItems(params);

    onMounted(() => {
        // 鼠标右键，菜单出现
        x6GraphRef.value?.on('blank:contextmenu', ({ e, x, y}) => {
            const contextMenu = contextMenuRef.value;
            if (!contextMenu) {
                return;
            }

            contextMenu.showContextMenu({x: e.clientX, y: e.clientY}, contextMenuItems);
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
    })

}


/**
 * 获取默认的上下文菜单
 * @param params 菜单集成参数
 * @returns 
 */
export function getDefaultContextMenuItems(params: MenuIntegerationArgs): MenuItem[] {
    
    // 参数展开
    const { x6GraphRef, contextMenuRef, planRef } = params;

    return [
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
}