<template>
    <el-form-item label="调度开始时间">
      <el-date-picker v-model="option.scheduleStartAt" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择" @change="onChange"/>
    </el-form-item>
    <el-form-item label="延迟时间">
      <el-input-number v-model="option.scheduleDelay" :min="0" controls-position="right" @change="onChange"/>
    </el-form-item>
    <el-form-item label="调度方式">
      <el-radio-group v-model="option.scheduleType" class="ml-4" @change="onChange">
        <el-radio v-for="item in AppConstants.ScheduleType" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>

    <template v-if="option.scheduleType === 1 || option.scheduleType === 2">
      <el-form-item label="调度间隔">
        <el-input-number v-model="option.scheduleInterval" :min="0" controls-position="right" @change="onChange"/>
      </el-form-item>
    </template>
    <template v-if="option.scheduleType === 3">
      <el-form-item label="CRON表达式类型">
        <el-radio-group v-model="option.scheduleCronType" class="ml-4" @change="onChange">
          <el-radio v-for="item in AppConstants.CRONType" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="CRON表达式">
        <el-input v-model="option.scheduleCron" @change="onChange"/>
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
