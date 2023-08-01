
import { MenuIntegerationArgs } from "./Menus";
import { useGraphNavMenu } from "./GraphNavMenuIntergration";
import { useBlankContextMenu } from "./BlankContextMenuIntergration";


export function useGraphContextMenu(params: MenuIntegerationArgs) {
    useGraphNavMenu(params);
    useBlankContextMenu(params);
}

