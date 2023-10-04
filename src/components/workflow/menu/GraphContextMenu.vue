<template>
    <div class="context-menu" :style="menuStyle" v-if="visible">
        <div v-for="menu in menusVisible" :key="menu.menuId"
             :type="menu.menuType ? menu.menuType : 'primary'"
             class="context-menu-item" 
             @click="menu.menuCallback"
        >
            <el-icon class="menu-icon"> 
                <component :is="Icons.get(menu.menuIcon)"></component>
            </el-icon>
            <span class="menu-name">{{ menu.menuName }}</span>
        </div>

    </div>
</template>


<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { MenuItem } from "./Menus";

/**
 * 全部组件
 */
const Icons: Map<string, any> = new Map();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    Icons.set(key, component);
}

// 菜单是否可见
const visible = ref(false);

// 菜单项
const menus = ref<MenuItem[]>([]);
const menusOnce = ref<MenuItem[] | undefined>();
const menusVisible = computed(() => menusOnce.value ? menusOnce.value : menus.value)

// 坐标，在页面视图中的坐标
const position = ref({
    x: 0, y: 0
})

// 坐标，在 Graph 中的坐标
const positionInGraph = ref({
    x: 0, y: 0
});

// 计算样式
const menuStyle = computed<string>(() => [
    'top:' + position.value.y + 'px',
    'left:' + position.value.x + 'px',
].join(';'));


/**
 * 展示上下文菜单
 * @param pos 菜单位置，相对于页面左上角的位置
 * @param menuItems 菜单项，不传则不更新菜单项
 */
function showContextMenu(pos: {x: number, y: number}, menuItems: MenuItem[] | undefined) {
    if (menuItems) {
        menus.value = menuItems;
    }
    menusOnce.value = undefined;
    position.value = { ...pos }
    visible.value = true;
}


/**
 * 展示上下文菜单，仅按照指定菜单项展示一次，菜单隐藏后恢复之前设置的菜单项。
 * @param pos 菜单位置，相对于页面左上角的位置
 * @param menuItems 菜单项，不传则不更新菜单项
 */
function showContextMenuOnce(pos: {x: number, y: number}, menuItems: MenuItem[]) {
    menusOnce.value = menuItems;
    position.value = { ...pos }
    visible.value = true;
}


/**
 * 隐藏上下文菜单
 * @param menuItems 
 */
function hideContextMenu(menuItems: MenuItem[] | undefined) {
    if (menuItems) {
        menus.value = menuItems;
    }
    menusOnce.value = undefined;
    visible.value = false;
}


/**
 * 获取坐标，在页面视图中的坐标
 */
function getPosition() {
    return { ...position.value }
}

/**
 * 更新坐标，在 Graph 中的坐标
 */ 
function setPositionInGraph(pos: {x: number, y: number}) {
    positionInGraph.value = { ...pos }
}

/**
 * 获取坐标，在 Graph 中的坐标
 */
function getPositionInGraph() {
    return { ...positionInGraph.value }
}



// 暴露的共有方法
defineExpose({
    getPosition,
    setPositionInGraph,
    getPositionInGraph,
    showContextMenu,
    showContextMenuOnce,
    hideContextMenu,
});

</script>


<style scoped lang="scss">

.context-menu {
    position: fixed;
    border-radius: 6px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);

    background-color: white;

    .context-menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;

        &[type=danger] { 
            color: var(--el-color-danger);
        }

        &[type=primary]:hover {
            color: var(--el-color-primary);
            background-color: var(--el-color-primary-light-9);
        }
        &[type=danger]:hover { 
            background-color: var(--el-color-danger-light-9);
        }

        &:hover:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        &:hover:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
    .menu-name {
        padding-left: 5px;
        line-break: 30px;
        font-size: 12px;
    }
}
</style>