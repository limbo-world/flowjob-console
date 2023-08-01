import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api"
import { Graph } from "@antv/x6"
import { ComponentPublicInstance, Ref } from "vue"
import GraphContextMenu from "./GraphContextMenu.vue"
import GraphNavMenu from "./GraphNavMenu.vue"


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
    planRef: Ref<PlanDTO | undefined>
}