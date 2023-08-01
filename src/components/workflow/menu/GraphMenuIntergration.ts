
import { MenuIntegerationArgs } from "./Menus";
import { useGraphNavMenu } from "./GraphNavMenuIntergration";
import { useBlankContextMenu } from "./BlankContextMenuIntergration";
import { useEdgeMenu } from "./EdgeMenuIntergration";


export function useGraphContextMenu(params: MenuIntegerationArgs) {
    useGraphNavMenu(params);
    useBlankContextMenu(params);
    useEdgeMenu(params);
}

