<template>
    <div class="nav-menu">
        <div v-for="menu in menus" :key="menu.menuId"
             class="nav-menu-item" 
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
import { ref } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import MenuItem from "./MenuItem";

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


/**
 * 更新导航菜单
 * @param menuItems 菜单项，不传则不更新菜单项
 */
function updateMenuItems(menuItems: MenuItem[]) {
    menus.value = menuItems;
}



// 暴露的共有方法
defineExpose({
    updateMenuItems
});
</script>


<style scoped lang="scss">
.nav-menu {
    position: absolute;
    top: 10px;
    left: 10px;

    display: flex;
    // box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);


    .nav-menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;
        margin-right: 10px;

        box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
        background-color: white;

        &:hover {
            background-color: #ecf5ff;
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