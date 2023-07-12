<template>
    <el-form-item label="调度开始时间">
      <el-date-picker v-model="option.scheduleStartAt" type="datetime" placeholder="请选择"/>
    </el-form-item>
    <el-form-item label="延迟时间">
      <el-input v-model="option.scheduleDelay" @input="onChange"/>
    </el-form-item>
    <el-form-item label="调度方式">
      <el-select v-model="option.scheduleType" placeholder="请选择">
        <el-option v-for="item in AppConstants.ScheduleType" :key="item.value" :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <template v-if="option.scheduleType === 1 || option.scheduleType === 2">
      <el-form-item label="调度间隔">
        <el-input v-model="option.scheduleInterval"/>
      </el-form-item>
    </template>
    <template v-if="option.scheduleType === 3">
      <el-form-item label="CRON表达式类型">
        <el-select v-model="option.scheduleCronType" placeholder="请选择">
          <el-option v-for="item in AppConstants.CRONType" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="CRON表达式">
        <el-input v-model="option.scheduleCron"/>
      </el-form-item>
    </template>
</template>

<script setup lang="ts">
// 参考 https://blog.csdn.net/Miketutu/article/details/130686380
import AppConstants from '@/libs/utils/AppConstants';
import {ref} from "vue";

interface ScheduleOption {
  scheduleType?: number,
  scheduleStartAt?: number,
  scheduleDelay?: number,
  scheduleInterval?: number,
  scheduleCron?: string,
  scheduleCronType?: string
}

defineProps<{option:ScheduleOption}>()

let option = ref<ScheduleOption>({})

const emit = defineEmits<{(e:'onChange',val:ScheduleOption):void}>()

// todo @B 是否有其它传递方式
const onChange = ()=>{
  emit('onChange', option.value)
}
</script>
