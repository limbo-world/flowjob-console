
import { MenuIntegerationArgs } from "./Menus";
import { useGraphNavMenu } from "./GraphNavMenuIntergration";
import { useBlankContextMenu } from "./BlankContextMenuIntergration";
import { useEdgeMenu } from "./EdgeMenuIntergration";
import { useNodeMenu } from "./NodeMenuIntergration";


export function useGraphContextMenu(params: MenuIntegerationArgs) {
    useGraphNavMenu(params);
    useBlankContextMenu(params);
    useEdgeMenu(params);
    useNodeMenu(params);
}

