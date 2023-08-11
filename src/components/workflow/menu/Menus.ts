import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api"
import { Graph } from "@antv/x6"
import { ComponentPublicInstance, Ref } from "vue"
import GraphContextMenu from "./GraphContextMenu.vue"
import GraphNavMenu from "./GraphNavMenu.vue"
import WorkfowDrawer from "../drawer/WorkflowDrawer.vue"
import { ButtonType } from "element-plus"


/** 
 * 菜单项
 */
export interface MenuItem {
    menuId: string,
    menuIcon: string,
    menuName: string,
    menuType?: ButtonType,
    menuCallback: (id: string) => void
}


/**
 * 菜单组
 */
export interface MenuItemGroup {
    groupId: string;
    menus: MenuItem[];
}


/**
 * 集成菜单功能时的参数
 */
export interface X6GraphControlIntegerationArgs {
    x6GraphRef: Ref<Graph | undefined>,
    contextMenuRef: Ref<ComponentPublicInstance<typeof GraphContextMenu>>,
    navMenuRef: Ref<ComponentPublicInstance<typeof GraphNavMenu>>,
    drawerRef: Ref<ComponentPublicInstance<typeof WorkfowDrawer>>,
    planRef: Ref<PlanDTO | undefined>
}