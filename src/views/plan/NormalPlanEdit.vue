<template>
  <el-container>
    <el-main>
      <!-- 基础内容 -->
      <el-form :model="form" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="form.name" :disabled="disabled"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" :disabled="disabled"/>
        </el-form-item>
        <el-form-item label="触发方式">
          <el-radio-group v-model="form.triggerType" class="ml-4" :disabled="disabled">
            <el-radio v-for="item in TriggerTypeEnum.getArr()" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 调度相关 -->
        <ScheduleOptionComponent :option="form.scheduleOption" :disabled="disabled" @onChange="receiveScheduleOptionChange"/>

        <!-- 普通任务 -->
        <el-form-item label="任务类型">
          <el-radio-group v-model="form.type" class="ml-4" :disabled="disabled">
            <el-radio v-for="item in JobTypeEnum.getArr()" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="执行器名称">
          <el-input v-model="form.executorName" :disabled="disabled"/>
        </el-form-item>
        <!-- 重试 -->
        <RetryOptionComponent :job-type="form.type" :option="form.retryOption" :disabled="disabled" @onChange="receiveRetryOptionChange"/>
        <!-- 负载 -->
        <DispatchOptionComponent :option="form.dispatchOption" :disabled="disabled" @onChange="receiveDispatchOptionChange"/>

        <el-form-item>
          <el-button v-if="!disabled" type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>

      </el-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {getCurrentInstance, Ref, ref} from 'vue'
import {JobTypeEnum, TriggerTypeEnum} from '@/types/console-enums'
import ScheduleOptionComponent from '@/components/plan/ScheduleOptionComponent.vue'
import RetryOptionComponent from '@/components/plan/RetryOptionComponent.vue'
import DispatchOptionComponent from '@/components/plan/DispatchOptionComponent.vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'

const {proxy}: any = getCurrentInstance();

const router = useRouter();
const planId = router.currentRoute.value.query.planId;
const disabled: Ref<boolean> = ref(router.currentRoute.value.query.edit !== "true");


// todo @B 如何从子模块引入
interface ScheduleOption {
  scheduleType?: number,
  scheduleRang?: [],
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

interface TagFilter {
  tagName: string,
  tagValue: string,
  condition: number
}
interface DispatchOption {
  loadBalanceType?: number,
  cpuRequirement?: number,
  ramRequirement?: number,
  tagFilters?: Array<TagFilter>
}

const scheduleOptionVal: ScheduleOption = {
  scheduleDelay: 0
}

const retryOptionVal: RetryOption = {}
const dispatchOptionVal: DispatchOption = {}

const form = ref({
  name: '',
  description: '',
  triggerType: 0,
  type: 0,
  scheduleOption: scheduleOptionVal,
  retryOption: retryOptionVal,
  dispatchOption: dispatchOptionVal
})



// 加载列表
const loadPlan = () => {
  if (planId == null) {
    return;
  }
  proxy.$request.get(`/api/v1/plan/get`, {params: {planId: planId}}).then((response: any) => {
    let result = response.data;
    result.scheduleOption.scheduleRang = [];
    if (result.scheduleOption.scheduleStartAt) {
      result.scheduleOption.scheduleRang.push(result.scheduleOption.scheduleStartAt)
    }
    if (result.scheduleOption.scheduleEndAt) {
      result.scheduleOption.scheduleRang.push(result.scheduleOption.scheduleEndAt)
    }
    form.value = result;
  });
}

loadPlan();

const receiveScheduleOptionChange = (val: ScheduleOption) => {
  form.value.scheduleOption = val
}
const receiveRetryOptionChange = (val:RetryOption)=>{
  form.value.retryOption = val
}
const receiveDispatchOptionChange = (val:DispatchOption)=>{
  form.value.dispatchOption = val
}

const onSubmit = () => {
  console.log(form.value)
  const planParam = form.value;
  console.log(planParam)
  // 根据id判断更新还是新增
  if (planId) {
    proxy.$request.post(`/api/v1/plan/update?planId=${planId}`, planParam).then((response: any) => {
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    }).catch((reject: any) => {
      ElMessage({
        showClose: true,
        message: reject.message,
        type: 'error',
        duration: 3000
      })
    })
  } else {
    proxy.$request.post(`/api/v1/plan/add`, planParam).then((response: any) => {
      ElMessage({
        message: '操作成功',
        type: 'success',
      })
    }).catch((reject: any) => {
      ElMessage({
        showClose: true,
        message: reject.message,
        type: 'error',
        duration: 3000
      })
    })
  }
}
</script>

<style lang="scss">
</style>
