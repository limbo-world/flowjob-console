<template>
  <el-container>
    <el-main>
      <!-- 基础内容 -->
      <el-form :model="form" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"/>
        </el-form-item>
        <el-form-item label="触发方式">
          <el-select v-model="form.triggerType" placeholder="请选择">
            <el-option v-for="item in AppConstants.TriggerType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <!-- 调度相关 -->
        <ScheduleOptionComponent :option="form.scheduleOption" @onChange="receiveScheduleOptionChange"/>

        <!-- 普通任务 -->
        <!-- 基础 -->
        <el-form-item label="任务类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option v-for="item in AppConstants.JobType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行器名称">
          <el-input v-model="form.executorName"/>
        </el-form-item>
        <!-- 重试 -->
        <RetryOptionComponent :job-type="form.type" :option="form.retryOption" @onChange="receiveRetryOptionChange"/>
        <!-- 负载 -->
        <DispatchOptionComponent :option="form.dispatchOption" @onChange="receiveDispatchOptionChange"/>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>

      </el-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import AppConstants from '@/libs/utils/AppConstants';
import ScheduleOptionComponent from '@/components/plan/ScheduleOptionComponent.vue'
import RetryOptionComponent from '@/components/plan/RetryOptionComponent.vue'
import DispatchOptionComponent from '@/components/plan/DispatchOptionComponent.vue'

// todo @B 如何从子模块引入
interface ScheduleOption {
  scheduleType?: number,
  scheduleStartAt?: number,
  scheduleDelay?: number,
  scheduleInterval?: number,
  scheduleCron?: string,
  scheduleCronType?: string
}
interface RetryOption {
  retry?: number,
  retryInterval?: number,
  retryType?: number
}
interface DispatchOption {
  loadBalanceType?: number,
  cpuRequirement?: number,
  ramRequirement?: number,
  tagFilters?: string,
}

const scheduleOptionVal:ScheduleOption = {
  scheduleType: 1 // todo @B 为什么无效
}

const retryOptionVal:RetryOption = {}

const dispatchOptionVal:DispatchOption = {}

// do not use same name with ref
const form = ref({
  name: '',
  description: '',
  triggerType: null,
  executorName: null,
  scheduleOption: scheduleOptionVal,
  retryOption: retryOptionVal,
  dispatchOption: dispatchOptionVal
})

const receiveScheduleOptionChange = (val:ScheduleOption)=>{
  form.value.scheduleOption = val
}
const receiveRetryOptionChange = (val:RetryOption)=>{
  form.value.retryOption = val
}
const receiveDispatchOptionChange = (val:DispatchOption)=>{
  form.value.dispatchOption = val
}

const onSubmit = () => {
  console.log(form)
}
</script>

<style lang="scss">
</style>
