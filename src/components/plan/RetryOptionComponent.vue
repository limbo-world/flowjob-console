<template>
  <el-form-item label="重试次数">
    <el-input v-model="option.retry" @change="onChange"/>
  </el-form-item>
  <el-form-item label="重试间隔">
    <el-input v-model="option.retryInterval" @change="onChange"/>
  </el-form-item>
  <el-form-item label="重试方式" v-if="jobType != null && JobTypeEnum.NORMAL.value !== jobType">
    <el-radio-group v-model="option.retryType" class="ml-4" @change="onChange">
      <el-radio v-for="item in RetryTypeEnum.getArr()" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import {JobTypeEnum, RetryTypeEnum} from '@/types/console-enums';
import {ref, toRef} from "vue";

interface RetryOption {
  retry?: number,
  retryInterval?: number,
  retryType?: number
}

const props = defineProps<{ option: RetryOption, jobType: number }>()

let option = toRef(props, "option");

const emit = defineEmits<{ (e: 'onChange', val: RetryOption): void }>()

const onChange = () => {
  emit('onChange', option.value)
}
</script>
