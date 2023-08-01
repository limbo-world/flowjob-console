import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { Edge, Graph } from "@antv/x6";
import { Ref, onMounted } from "vue";
import { MenuIntegerationArgs } from "./Menus";
import { addChild } from "../WorkflowPlanFunctions";



export function useEdgeMenu(params: MenuIntegerationArgs) {

    const { planRef, x6GraphRef, navMenuRef } = params;

    onMounted(() => {
    
        // 连线建立事件，绑定作业父子关系
        x6GraphRef.value?.on('edge:connected', ({ edge }) => {
            const source = edge.source as Edge.TerminalCellLooseData;
            const target = edge.target as Edge.TerminalCellLooseData;
            addChild(planRef.value as PlanDTO, source.cell as string, target.cell as string);
        })

        // TODO 连线单选事件，添加删除连线按钮到 contextMenu
        x6GraphRef.value?.on('edge:click', ({ edge }) => {
            debugger
            navMenuRef.value.addMenuGroup({
                groupId: 'edgeMenus',
                menus: [
                    {
                        menuId: 'delteEdge',
                        menuIcon: 'Delete',
                        menuName: '删除',
                        menuType: 'danger',
                        menuCallback: (id: string) => {}
                    }
                ]
            });
            // 连线标红
            edge.attr('line/stroke', '#FF0000')
        })
    
    });


}