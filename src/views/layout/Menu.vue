<template>

  <div class="side-menu">

    <!-- LOGO -->
    <div class="logo-container">
      <img class="logo-img" src="@/assets/vue.svg"/>
    </div>

    <scroll-view class="menu-scroll-content">
      <el-menu
          mode="vertical"
          :show-timeout="200"
          :default-active="$route.path"
          :collapse-transition="false"
          active-text-color="#409EFF"
          :unique-opened="false"
          :router="true"
      >
<!--        :default-openeds="['200']"-->
        <template v-for="menu in menus">
          <!-- 当前菜单无子菜单，即叶子菜单，直接渲染router-link -->
          <el-menu-item v-if="!hasChildren(menu)" :index="menu.code" :route="menu.route" :class="menuHiddenClass">
            <component :is="menu.icon" class="menu-icon"/>
            <span>{{ $t(menu.name) }}</span>
          </el-menu-item>

          <!-- 存在子菜单时，先渲染当前菜单 -->
          <el-sub-menu v-else :index="menu.code" :key="menu.name" :class="menuHiddenClass">
            <template v-slot:title>
              <component :is="menu.icon" class="menu-icon"/>
              <span>{{ $t(menu.name) }}</span>
            </template>

            <!-- 这里不再考虑孙菜单的情况，只支持二级菜单 -->
            <el-menu-item v-for="subMenu in menu.children" :key="subMenu.route" :index="subMenu.route"
                          :route="{'path': subMenu.route}">
              <component :is="subMenu.icon" class="menu-icon"/>
              <span>{{ $t(subMenu.name) }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </scroll-view>
  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView.vue';
import MenuConfigs from '@/libs/router/menu.ts';

export default {
  data() {
    return {
      menus: MenuConfigs
    }
  },
  components: {
    'scroll-view': ScrollView
  },

  computed: {
    menuHiddenClass() {
      // return this.isMenuHidden ? 'menu-hidden' : '';
      return '';
    }
  },

  created() {
    pages.layoutMenu = this;
  },

  watch: {},

  methods: {
    hasChildren(m) {
      console.log(m)
      return m.children && m.children.length > 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.side-menu {
  width: 100%;
  height: 100%;
  background-color: white;

  .logo-container {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: white;
    position: relative;
    z-index: 100;

    .logo-title {
      height: 50px;
      line-height: 50px;
      font-size: 25px;
      margin-left: 10px;
      color: aliceblue;
    }

    img {
      width: 70%;
      height: 100%;
    }
  }

  .menu-scroll-content {
    width: 230px;
    //height: calc(100% - 50px);
    z-index: 90;
  }
}


.menu-hidden {
  .side-menu {
    .logo-container {
      .logo-title {
        display: none;
      }
    }
  }
}

.el-menu {
  height: 100%;
  border: none;

  .el-submenu__title, .el-menu-item {
    height: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .menu-icon {
      margin-right: 10px;
      overflow: hidden;
      vertical-align: baseline;
      width: 14px;
      height: 14px;
      font-size: 10px;
    }
  }

  .el-sub-menu__title {
    .menu-icon {
      margin-right: 10px;
      overflow: hidden;
      vertical-align: baseline;
      width: 14px;
      height: 14px;
      font-size: 10px;
    }
  }

  .el-submenu, .el-menu-item {
    &.menu-hidden .menu-icon {
      margin-right: 0;
    }
  }

  [class*=fa] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
}
</style>
