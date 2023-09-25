<template>
    <div class="nav-bar">
    </div>

</template>

<script lang="ts">
export default {
}
</script>


<style lang="scss">
.nav-bar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .toggle-menu {
    font-size: 20px;
    transition: transform .3s;

    &.menu-hidden {
      transform: rotateZ(90deg);
    }
  }

  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
}

</style>

