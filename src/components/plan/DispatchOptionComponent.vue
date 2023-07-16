<template>
  <el-form-item label="负载方式">
    <el-radio-group v-model="option.loadBalanceType" class="ml-4" @change="onChange">
      <el-radio v-for="item in AppConstants.LoadBalanceType" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="所需CPU数">
    <el-input v-model="option.cpuRequirement" @change="onChange"/>
  </el-form-item>
  <el-form-item label="所需内存大小">
    <el-input v-model="option.ramRequirement" @change="onChange"/>
  </el-form-item>
<!--  <el-form-item label="标签">-->
<!--    <el-input v-model="option.tagFilters" @change="onChange"/>-->
<!--  </el-form-item>-->
</template>

<script setup lang="ts">
import AppConstants from '@/libs/utils/AppConstants';
import {ref} from "vue";

interface DispatchOption {
  loadBalanceType?: number,
  cpuRequirement?: number,
  ramRequirement?: number,
  tagFilters?: string,
}

defineProps<{ option: DispatchOption }>()

let option = ref<DispatchOption>({})

const emit = defineEmits<{ (e: 'onChange', val: DispatchOption): void }>()

const onChange = () => {
  emit('onChange', option.value)
}
</script>
