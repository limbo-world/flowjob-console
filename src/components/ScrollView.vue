<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
        <div class="scroll-visible-area" ref="visibleArea" :style="{top: scrollTop + 'px'}">
            <slot></slot>
        </div>
    </div>

</template>


<script setup lang="ts">
import {getCurrentInstance, ref, toRef} from "vue";

const {proxy}: any = getCurrentInstance();

const props = defineProps<{debounceDelta: number}>()

const debounceDelta = toRef(props, "debounceDelta");
const scrollTop = ref(0)

const handleScroll = (e:any) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 3;
  const $container = proxy.$refs.scrollContainer;
  const $containerHeight = $container.offsetHeight;
  const $visibleArea = proxy.$refs.visibleArea;
  const $visibleHeight = $visibleArea.offsetHeight;

  if (eventDelta > 0) {
    scrollTop.value = Math.min(0, scrollTop.value + eventDelta)
  } else {
    if ($containerHeight - debounceDelta.value < $visibleHeight) {
      if (scrollTop.value >= -($visibleHeight - $containerHeight + debounceDelta.value)) {
        scrollTop.value = Math.max(scrollTop.value + eventDelta, $containerHeight - $visibleHeight - this.debounceDelta)
      }
    } else {
      scrollTop.value = 0
    }
  }
}
</script>


<style scoped>
    .scroll-container {
        width: 100%;
        position: relative;
        background-color: transparent;

        .scroll-visible-area {
            position: absolute;
            width: 100% !important;
        }
    }
</style>
