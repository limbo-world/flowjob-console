<template>
    <div class="nav-menu">
        <el-button-group>
            <el-button v-for="menu in menus" :key="menu.menuId" 
                       type="default" :icon="Icons.get(menu.menuIcon)"
                       @click="menu.menuCallback"
            >{{ menu.menuName }}</el-button>
        </el-button-group>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { MenuItem } from "./Menus";

/**
 * 全部组件
 */
const Icons: Map<string, any> = new Map();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    Icons.set(key, component);
}

// 菜单项
const menus = ref<MenuItem[]>([]);


/**
 * 更新导航菜单
 * @param menuItems 菜单项，不传则不更新菜单项
 */
function updateMenuItems(menuItems: MenuItem[]) {
    menus.value = menuItems;
}


/**
 * 添加导航菜单项
 */
function addMenuItem(menuItem: MenuItem) {
    // 有则更新
    for (let i = 0; i < menus.value.length; i++) {
        const m = menus.value[i];
        if (menuItem.menuId === m.menuId) {
            menus.value[i] = menuItem;
            return;
        }
    }
    
    // 无则新增
    menus.value.push(menuItem);
}


/**
 * 移除导航菜单项
 * @param menuId 菜单项 ID
 */
function removeMenuItem(menuId: string) {
    menus.value = menus.value.filter(m => menuId != m.menuId);
}


// 暴露的共有方法
defineExpose({
    updateMenuItems,
    addMenuItem,
    removeMenuItem,
});
</script>


<style scoped lang="scss">
.nav-menu {
    position: absolute;
    top: 10px;
    left: 10px;

    .el-button {
        font-size: 12px;
        font-weight: normal;
    }
}

</style>