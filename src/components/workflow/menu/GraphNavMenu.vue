<template>
    <div class="nav-menu">
        <el-button-group v-for="group in menus" :key="group.groupId">
            <el-button v-for="menu in group.menus" :key="menu.menuId" 
                       :type="menu.menuType ? menu.menuType : 'default'" 
                       :icon="Icons.get(menu.menuIcon)"
                       @click="menu.menuCallback"
            >{{ menu.menuName }}</el-button>
        </el-button-group>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { MenuItemGroup } from "./Menus";

/**
 * 全部组件
 */
const Icons: Map<string, any> = new Map();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    Icons.set(key, component);
}


// 菜单项
const menus = ref<MenuItemGroup[]>([]);


/**
 * 更新导航菜单
 * @param menuGroups 菜单组列表
 */
function updateMenus(menuGroups: MenuItemGroup[]) {
    menus.value = menuGroups;
}


/**
 * 添加导航菜单项
 */
function addMenuGroup(menuGroup: MenuItemGroup) {
    // 有则更新
    for (let i = 0; i < menus.value.length; i++) {
        const m = menus.value[i];
        if (menuGroup.groupId === m.groupId) {
            menus.value[i] = menuGroup;
            return;
        }
    }
    
    // 无则新增
    menus.value.push(menuGroup);
}


/**
 * 移除导航菜单项
 * @param menuId 菜单项 ID
 */
function removeMenuGroup(groupId: string) {
    menus.value = menus.value.filter(m => groupId != m.groupId);
}


// 暴露的共有方法
defineExpose({
    updateMenus,
    addMenuGroup,
    removeMenuGroup,
});
</script>


<style scoped lang="scss">
.nav-menu {
    position: absolute;
    top: 10px;
    left: 10px;

    .el-button-group:not(:first-child) {
        margin-left: 10px;
    }

    .el-button {
        font-size: 12px;
        font-weight: normal;
    }
}

</style>