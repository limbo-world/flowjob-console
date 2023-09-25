<template>
  <el-form-item label="重试次数" :label-width="labelWidth">
    <el-input v-model="option.retry" @change="onChange" :disabled="disabled"/>
  </el-form-item>
  <el-form-item label="重试间隔" :label-width="labelWidth">
    <el-input v-model="option.retryInterval" @change="onChange" :disabled="disabled"/>
  </el-form-item>
<!--  <el-form-item label="重试方式" :label-width="labelWidth"-->
<!--                v-if="jobType != null && JobTypeEnum.STANDALONE.value !== jobType">-->
<!--    <el-radio-group v-model="option.retryType" class="ml-4" @change="onChange" :disabled="disabled">-->
<!--      <el-radio v-for="item in RetryTypeEnum.getArr()" :label="item.value">{{item.label}}</el-radio>-->
<!--    </el-radio-group>-->
<!--  </el-form-item>-->
</template>

<script setup lang="ts">
import {JobTypeEnum, RetryTypeEnum} from '@/types/console-enums';
import {ref, toRef} from "vue";

interface RetryOption {
  retry?: number,
  retryInterval?: number,
  retryType?: number
}

const props = defineProps<{
  option: RetryOption,
  jobType: number,
  disabled: boolean,
  labelWidth: string|number
}>()

let option = toRef(props, "option");
const labelWidth = toRef(props, "labelWidth");

const emit = defineEmits<{ (e: 'onChange', val: RetryOption): void }>()

const onChange = () => {
  emit('onChange', option.value)
}
</script>
