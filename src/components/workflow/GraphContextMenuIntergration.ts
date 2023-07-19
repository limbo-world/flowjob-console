
import { computed, onMounted, Ref, ref, toRef, toRefs } from "vue";
import { Graph } from "@antv/x6";
import GraphContextMenu from "./GraphContextMenu.vue";


export function useGraphContextMenu(x6GraphRef: Ref<Graph | undefined>, contextMenu: Ref) {

    // 菜单数据
    const contextMenuData = [
        {
            menuId: 'add-node',
            menuIcon: 'CirclePlusFilled',
            menuName: '新增节点',
            menuCallback: () => console.log('got it')
        },
        {
            menuId: 'centerContent',
            menuIcon: 'Aim',
            menuName: '居中',
            menuCallback: () => console.log('got it')
        },
        {
            menuId: 'autoLayout',
            menuIcon: 'Grid',
            menuName: '自适应布局',
            menuCallback: () => console.log('got it')
        },
    ];


    onMounted(() => {
        // 鼠标右键，菜单出现
        x6GraphRef.value?.on('blank:contextmenu', ({ e, x, y}) => {
            console.log('画布右键单机', e, x, y);
            contextMenu.value.setPosition({x: e.clientX, y: e.clientY});
            contextMenu.value.setVisible(true);
        });

        // 注册事件：关闭菜单
        x6GraphRef.value?.on('blank:click', ({ e, x, y}) => {
            contextMenu.value.setVisible(false);
        });
    });


    return toRefs({
        contextMenuData
    })


}


