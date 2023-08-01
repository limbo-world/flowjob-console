import { onMounted, toRefs } from "vue";
import { getDefaultContextMenuItems } from "./BlankContextMenuIntergration";
import { MenuIntegerationArgs } from "./Menus";

export function useGraphNavMenu(params: MenuIntegerationArgs) {

    const { navMenuRef } = params;
    const contextMenuItems = getDefaultContextMenuItems(params);

    onMounted(() => {
        // 设置导航菜单
        navMenuRef.value.updateMenuItems(contextMenuItems);
    });

    return toRefs({
        contextMenuItems
    })
}
