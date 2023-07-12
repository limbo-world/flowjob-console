<template>
  <el-form-item label="重试次数">
    <el-input v-model="option.retry"/>
  </el-form-item>
  <el-form-item label="重试间隔">
    <el-input v-model="option.retryInterval"/>
  </el-form-item>
  <el-form-item label="重试方式" v-if="jobType != null && jobType !== 1">
    <el-select v-model="option.retryType" placeholder="请选择">
      <el-option v-for="item in AppConstants.RetryType" :key="item.value" :label="item.label"
                 :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import AppConstants from '@/libs/utils/AppConstants';
import {ref} from "vue";

interface RetryOption {
  retry?: number,
  retryInterval?: number,
  retryType?: number
}

defineProps<{ option: RetryOption, jobType: number }>()

let option = ref<RetryOption>({
  retryType: 1
})

const emit = defineEmits<{ (e: 'onChange', val: RetryOption): void }>()

const onChange = () => {
  emit('onChange', option.value)
}
</script>
