import { onMounted } from "vue";
import { X6GraphControlIntegerationArgs } from "./Menus";
import { Graph, Node } from "@antv/x6";
import { addChild, addEmptyJob, copyJob, removeChildJob, removeJob } from "../WorkflowPlanFunctions";
import { PlanDTO, WorkflowJobDTO } from "@/types/swagger-ts-api";
import { autoLayout, generateNodesAndEdges } from "../X6GraphIntergration";



export function initNodeMenu(params: X6GraphControlIntegerationArgs) {

    const { planRef, x6GraphRef, navMenuRef, contextMenuRef, drawerRef } = params;

    // 节点单击事件
    x6GraphRef.value?.on('node:click', ({e, node}) => {
        // 展示导航菜单
        const menuItems = getNodeMenuItems(node, params);
        navMenuRef.value.addMenuGroup({
            groupId: 'nodeMenus',
            menus: menuItems
        });

        // 展示编辑抽屉
        const job = planRef.value?.workflow?.find(j => j.id === node.id);
        if (job) {
            drawerRef.value.showDrawer(job);
        }
    });

    // 节点右键事件
    x6GraphRef.value?.on('node:contextmenu', ({e, node}) => {
        // 展示右键菜单
        const position = {x: e.clientX, y: e.clientY};
        const menuItems = getNodeMenuItems(node, params);
        contextMenuRef.value.showContextMenuOnce(position, menuItems);
    })


    // 注册其他左键单击事件：关闭导航菜单、右键菜单
    const hideMenuEvents = [
        'edge:click',
        'node:port:click',
        'blank:click',
    ];
    hideMenuEvents.forEach(e => x6GraphRef.value?.on(e, (ee: any) => {
        navMenuRef.value.removeMenuGroup('nodeMenus');
        contextMenuRef.value.hideContextMenu();
    }));

    x6GraphRef.value?.on('selection:changed', (e) => console.log('selection change', e))


}



function getNodeMenuItems(node: Node, args: X6GraphControlIntegerationArgs) {
    // 参数展开
    const { x6GraphRef, planRef, navMenuRef, contextMenuRef } = args;

    return [
        {
            menuId: 'addChildJob',
            menuIcon: 'CirclePlusFilled',
            menuName: '新增子节点',
            menuType: 'default',
            menuCallback: (event: any) => {
                const graph = x6GraphRef.value as Graph;
                const plan = planRef.value as PlanDTO;
                const nodePos = node.getPosition();

                // 生成新的作业，并将新作业节点添加到 DAG
                const parentJob = plan.workflow?.filter(j => j.id === node.id)[0] as WorkflowJobDTO;
                const newJob = addEmptyJob(plan, {x: nodePos.x, y: nodePos.y + 86});
                addChild(plan, parentJob.id, newJob.id);

                // 将节点、连线添加到 x6
                const { nodes, edges } = generateNodesAndEdges(graph, plan.dagData, [parentJob, newJob]);
                graph.addNodes(nodes);
                graph.addEdges(edges);
            }
        },
        {
            menuId: 'copyJob',
            menuIcon: 'CopyDocument',
            menuName: '复制节点',
            menuType: 'default',
            menuCallback: (event: any) => {
                const graph = x6GraphRef.value as Graph;
                const plan = planRef.value as PlanDTO;

                // 生成新作业
                const newJob = copyJob(plan, node.id);

                // 将节点、连线添加到 x6
                const { nodes, edges } = generateNodesAndEdges(graph, plan.dagData, [newJob]);
                graph.addNodes(nodes);
                graph.addEdges(edges);

            }
        },
        {
            menuId: 'deleteJob',
            menuIcon: 'Delete',
            menuName: '删除当前节点',
            menuType: 'danger',
            menuCallback: (event: any) => {
                const graph = x6GraphRef.value as Graph;
                const plan = planRef.value as PlanDTO;

                removeJob(plan, node.id);
                graph.removeNode(node);
            }
        },
        {
            menuId: 'deleteChildrenJob',
            menuIcon: 'Delete',
            menuName: '删除子节点',
            menuType: 'danger',
            menuCallback: (event: any) => {
                const graph = x6GraphRef.value as Graph;
                const plan = planRef.value as PlanDTO;

                const removedJobIds = removeChildJob(plan, node.id);
                removedJobIds.forEach(jid => graph.removeNode(jid));
            }
        }
    ]
}