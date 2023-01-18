<template>

  <el-container class="app-wrapper">
    <!-- 左侧菜单 -->
    <el-aside>
      <Menu></Menu>
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <!-- 头部 -->
      <el-header height="50px">
        <NavBar></NavBar>
      </el-header>

      <!-- 页面主体 -->
      <el-main class="relative">
        <AppMain></AppMain>
      </el-main>
    </el-container>
  </el-container>

</template>

<script setup lang="ts">
import AppMain from "./Main.vue";
import Menu from "./Menu.vue";
import NavBar from "./NavBar.vue";

</script>

<style lang="scss" scoped>
.el-container.app-wrapper {
  height: 100%;

  .el-aside {
    width: 230px !important;
    background-color: rgb(48, 65, 86);
    -webkit-transition: width .3s;
    -moz-transition: width .3s;
    -ms-transition: width .3s;
    -o-transition: width .3s;
    transition: width .3s;
    box-shadow: 0px 2px 5px #888888;
    z-index: 100;

    &.menu-hidden {
      width: 64px !important;
    }
  }

  .el-header {
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .el-main {
    padding: 0;
  }
}
</style>
