<template>
  <el-drawer v-model="jobInstanceVisible" direction="rtl" size="80%" :before-close="handleClose">
    <el-table :data="jobInstances" style="width: 100%" row-key="id" border>
      <el-table-column prop="jobInstanceId" label="id"/>
      <el-table-column prop="jobId" label="JobID"/>
      <el-table-column prop="retryTimes" label="重试次数"/>
      <el-table-column prop="triggerAt" label="计划时间"></el-table-column>
      <el-table-column prop="startAt" label="开始时间"></el-table-column>
      <el-table-column prop="endAt" label="结束时间"></el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          {{ JobStatusEnum.getByValue(scope.row.status).label }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" @click="() => {tasksVisible = true; loadTasks(scope.row.jobInstanceId)}">查看详情</el-button>
          <el-button link type="primary" @click="() => {errorVisible = true;errorMsg.value = scope.row.errorMsg}">异常信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>

  <el-dialog v-model="tasksVisible" width="80%">
    <el-table :data="tasks" style="width: 100%" row-key="id" border>
      <el-table-column prop="taskId" label="id"/>
      <el-table-column prop="workerId" label="workerId"/>
      <el-table-column label="类型" width="100">
        <template #default="scope">
          {{ TaskTypeEnum.getByValue(scope.row.type).label }}
        </template>
      </el-table-column>
      <el-table-column prop="startAt" label="开始时间"></el-table-column>
      <el-table-column prop="endAt" label="结束时间"></el-table-column>
      <el-table-column prop="result" label="结果"></el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          {{ TaskStatusEnum.getByValue(scope.row.status).label }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" @click="() => {errorVisible = true;errorMsg.value = scope.row.errorMsg}">异常信息</el-button>
          <el-button link type="primary" @click="() => {errorVisible = true;errorMsg.value = scope.row.errorStackTrace}">异常堆栈</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <el-dialog v-model="errorVisible" width="50%">
    <div>
      {{errorMsg}}
    </div>
  </el-dialog>

</template>

<script setup lang="ts">
import {JobStatusEnum, TaskStatusEnum, TaskTypeEnum} from '@/types/console-enums';
import {getCurrentInstance, ref, toRef, watch} from "vue";

const {proxy}: any = getCurrentInstance();

const tasksVisible = ref(false);
const errorVisible = ref(false);
const errorMsg = ref("");

let jobInstances = ref([])
let tasks = ref([])

const props = defineProps<{visible: boolean, planInstanceId: string}>()

const emit = defineEmits<{ (e: 'handleClose', val: boolean): void }>()

const jobInstanceVisible = toRef(props, "visible");
const planInstanceId = toRef(props, "planInstanceId");

watch(jobInstanceVisible, (newVal, oldVal) => {
  console.log(12321, newVal, oldVal)
  if (newVal) {
    loadJobInstances(planInstanceId.value)
  }
})

const loadJobInstances = (planInstanceId: string) => {
  proxy.$request.get(`/api/v1/job-instance/page`, {params: {planInstanceId: planInstanceId}}).then((response: any) => {
    let page = response.data
    jobInstances.value = page.data;
  });
}

const loadTasks = (jobInstanceId: string) => {
  proxy.$request.get(`/api/v1/task/page`, {params: {jobInstanceId: jobInstanceId}}).then((response: any) => {
    let page = response.data
    tasks.value = page.data;
  });
}

const handleClose = () =>{
  emit('handleClose', true)
}
</script>
