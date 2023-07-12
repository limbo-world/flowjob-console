<template>
  <el-form-item label="负载方式">
    <el-select v-model="option.loadBalanceType" placeholder="请选择">
      <el-option v-for="item in AppConstants.LoadBalanceType" :key="item.value" :label="item.label"
                 :value="item.value"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="所需CPU数">
    <el-input v-model="option.cpuRequirement"/>
  </el-form-item>
  <el-form-item label="所需内存大小">
    <el-input v-model="option.ramRequirement"/>
  </el-form-item>
  <el-form-item label="标签">
    <el-input v-model="option.tagFilters"/>
  </el-form-item>
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
