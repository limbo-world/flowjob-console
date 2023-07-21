<template>
    <div class="context-menu" :style="menuStyle" v-if="visible">
        <div v-for="menu in menus" :key="menu.menuId"
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

/**
 * 全部组件
 */
const Icons: Map<string, any> = new Map();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    Icons.set(key, component);
}

interface ContextMenuProps {
    menus: ContextMenuItem[]
}

/**
 * 定义菜单项类型
 */
interface ContextMenuItem{
    menuId: string,
    menuIcon: string,
    menuName: string,
    menuCallback: (id: string) => void
}

// 组件属性：菜单
const props = defineProps<ContextMenuProps>();

// 菜单是否可见
const visible = ref(false);

// 菜单项
const menus = toRef(props, 'menus');

// 坐标，在页面视图中的坐标
const position = ref({
    x: 0, y: 0
})

// 坐标，在 Graph 中的坐标
const positionInGraph = ref({
    x: 0, y: 0
});

/**
 * 设置菜单是否可见
 */
function setVisible(v: boolean) {
    visible.value = v;
}

/**
 * 更新坐标，在页面视图中的坐标
 */ 
function setPosition(pos: {x: number, y: number}) {
    position.value = { ...pos }
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

// 计算样式
const menuStyle = computed<string>(() => [
    'top:' + position.value.y + 'px',
    'left:' + position.value.x + 'px',
].join(';'));



// 暴露的共有方法
defineExpose({
    setVisible,
    getPosition,
    setPosition,
    getPositionInGraph,
    setPositionInGraph,
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

        &:hover {
            background-color: #ecf5ff;
        }
        &:hover:first-child {
            border-radius: 6px 6px 0 0;
        }
        &:hover:last-child {
            border-radius: 0 0 6px 6px;
        }
    }
    .menu-name {
        padding-left: 5px;
        line-break: 30px;
        font-size: 12px;
        color: #666;
    }
}

</style>