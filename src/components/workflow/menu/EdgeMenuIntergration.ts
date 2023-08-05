import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { Edge, Graph } from "@antv/x6";
import { Ref, onMounted, ref } from "vue";
import { MenuIntegerationArgs } from "./Menus";
import { addChild, removeChild } from "../WorkflowPlanFunctions";



export function useEdgeMenu(params: MenuIntegerationArgs) {

    const { planRef, x6GraphRef, navMenuRef, contextMenuRef } = params;
    const highlightEdge = ref<Edge>();

    // 取消高亮
    function cancelPreviousHighlight() {
        highlightEdge.value?.attr('line/stroke', '#C2C8D5');
    }

    onMounted(() => {
    
        // 连线建立事件，绑定作业父子关系
        x6GraphRef.value?.on('edge:connected', ({ edge }) => {
            const source = edge.source as Edge.TerminalCellLooseData;
            const target = edge.target as Edge.TerminalCellLooseData;
            addChild(planRef.value as PlanDTO, source.cell as string, target.cell as string);
        })

        // 连线左键单击事件，添加删除连线按钮到 contextMenu
        x6GraphRef.value?.on('edge:click', ({e, edge}) => {
            // 展示导航菜单
            const menuItems = getEdgeMenuItems(edge, params);
            navMenuRef.value.addMenuGroup({
                groupId: 'edgeMenus',
                menus: menuItems
            });

            // 连线标红
            edge.attr('line/stroke', '#FF0000')
            highlightEdge.value = edge;
        })

        // 连线右键单击事件，展示一次性连线按钮
        x6GraphRef.value?.on('edge:contextmenu', ({ e, edge}) => {
            // 展示右键菜单
            const position = {x: e.clientX, y: e.clientY};
            const menuItems = getEdgeMenuItems(edge, params);
            contextMenuRef.value.showContextMenuOnce(position, menuItems)

            // 取消之前标红的连线
            cancelPreviousHighlight();

            // 连线标红
            edge.attr('line/stroke', '#FF0000')
            highlightEdge.value = edge;
        })

        // 注册其他左键单击事件：取消选中连线
        const removeHightlightEvents = [
            'cell:click',
            'node:click',
            'node:port:click',
            'blank:click',
        ];
        removeHightlightEvents.forEach(e => x6GraphRef.value?.on(e, (ee: any) => {
            // 非 edge 点击事件需要移除导航菜单
            if (!ee.edge) {
                navMenuRef.value.removeMenuGroup('edgeMenus');
            }
            cancelPreviousHighlight();
        }));
    
    });


}


/**
 * 获取边选中、右键菜单项
 * @param edge 被选中的边
 * @param args 菜单参数
 * @returns 
 */
function getEdgeMenuItems(edge: Edge, args: MenuIntegerationArgs) {
    // 参数展开
    const { x6GraphRef, planRef, navMenuRef, contextMenuRef } = args;

    return [
        {
            menuId: 'delteEdge',
            menuIcon: 'Delete',
            menuName: '删除',
            menuType: 'danger',
            menuCallback: (event: any) => {
                // 删除连线
                x6GraphRef.value?.removeEdge(edge.id);
                
                // 删除父子作业关联
                const source = edge.source as Edge.TerminalCellLooseData;
                const target = edge.target as Edge.TerminalCellLooseData;
                removeChild(planRef.value as PlanDTO, source.cell as string, target.cell as string)

                // 隐藏导航菜单、右键菜单
                navMenuRef.value.removeMenuGroup('edgeMenus')
                contextMenuRef.value.hideContextMenu()
            }
        }
    ]
}