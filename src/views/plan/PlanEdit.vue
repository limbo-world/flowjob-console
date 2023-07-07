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
        <el-form-item label="任务类型">
          <el-select v-model="form.planType" placeholder="请选择">
            <el-option v-for="item in AppConstants.PlanType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="触发方式">
          <el-select v-model="form.triggerType" placeholder="请选择">
            <el-option v-for="item in AppConstants.TriggerType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调度开始时间">
          <el-date-picker v-model="form.scheduleStartAt" type="datetime" placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="延迟时间">
          <el-input v-model="form.scheduleDelay" />
        </el-form-item>
        <el-form-item label="调度方式">
          <el-select v-model="form.scheduleType" placeholder="请选择">
            <el-option v-for="item in AppConstants.ScheduleType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="form.scheduleType === 1 || form.scheduleType === 2">
          <el-form-item label="调度间隔">
            <el-input v-model="form.scheduleInterval" />
          </el-form-item>
        </template>
        <template v-if="form.scheduleType === 3">
          <el-form-item label="CRON表达式">
            <el-input v-model="form.scheduleCron" />
          </el-form-item>
          <el-form-item label="CRON表达式类型">
            <el-select v-model="form.scheduleCronType" placeholder="请选择">
              <el-option v-for="item in AppConstants.CRONType" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </template>


        <!-- 普通任务 -->
        <el-form-item label="任务类型">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="普通任务" value="shanghai"/>
            <el-option label="工作流任务" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="执行器名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="重试次数">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="重试间隔">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="重试方式">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="负载方式">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="普通任务" value="shanghai"/>
            <el-option label="工作流任务" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所需CPU数">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="所需内存大小">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.name"/>
        </el-form-item>

        <!-- 工作流任务 -->


      </el-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import AppConstants from '@/libs/utils/AppConstants';

// do not use same name with ref
const form = reactive({
  name: '',
  description: '',
  planType: null,
  triggerType: null,
  scheduleType: null,
  scheduleStartAt: '',
  scheduleDelay: '',
  scheduleInterval: '',
  scheduleCron: '',
  scheduleCronType: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss">
</style>
