import { onMounted, toRefs } from "vue";
import { getDefaultContextMenuItems } from "./BlankContextMenuIntergration";
import { X6GraphControlIntegerationArgs } from "./Menus";

export function initGraphNavMenu(params: X6GraphControlIntegerationArgs) {
    const { navMenuRef } = params;
    const contextMenuItems = getDefaultContextMenuItems(params);

    // 设置导航菜单
    navMenuRef.value.updateMenus([{
        groupId: 'default',
        menus: contextMenuItems
    }]);
}
