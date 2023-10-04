
import { X6GraphControlIntegerationArgs } from "./menu/Menus";
import { initGraphNavMenu } from "./menu/GraphNavMenuIntergration";
import { initBlankContextMenu } from "./menu/BlankContextMenuIntergration";
import { initEdgeMenu } from "./menu/EdgeMenuIntergration";
import { initNodeMenu } from "./menu/NodeMenuIntergration";


export function initX6GraphControl(params: X6GraphControlIntegerationArgs) {
    initGraphNavMenu(params);
    initBlankContextMenu(params);
    initEdgeMenu(params);
    initNodeMenu(params);
}

