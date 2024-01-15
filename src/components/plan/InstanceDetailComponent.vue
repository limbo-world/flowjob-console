<template>
  <el-drawer v-model="jobInstanceVisible" direction="rtl" size="80%" :before-close="handleClose">
    <el-table :data="jobInstances" style="width: 100%" row-key="id" border>
      <el-table-column prop="jobInstanceId" label="id"/>
      <el-table-column prop="jobId" label="JobID"/>
      <el-table-column prop="retryTimes" label="重试次数"/>
      <el-table-column label="计划时间">
        <template #default="scope">
          {{ DateUtils.formatTimestampYMDHMS(scope.row.triggerAt) }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template #default="scope">
          {{ DateUtils.formatTimestampYMDHMS(scope.row.startAt) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template #default="scope">
          {{ DateUtils.formatTimestampYMDHMS(scope.row.endAt) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          {{ JobStatusEnum.getByValue(scope.row.status).label }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" @click="() => {
            tasksVisible = true; taskQueryForm.jobInstanceId = scope.row.jobInstanceId; loadTasks()
          }">查看详情</el-button>
          <el-button link type="primary" @click="() => {errorMsg = scope.row.errorMsg; errorVisible = true;}">异常信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next" :total="jobInstanceQueryForm.total"
                   :current-page="jobInstanceQueryForm.current"
                   :page-size="jobInstanceQueryForm.size" @current-change="handleJobInstancePageChange">
    </el-pagination>
  </el-drawer>

  <el-dialog v-model="tasksVisible" width="80%">
    <el-table :data="tasks" style="width: 100%" row-key="id" border>
      <el-table-column prop="taskId" label="id"/>
      <el-table-column prop="workerId" label="workerId"/>
      <el-table-column prop="workerAddress" label="workerAddress"/>
      <el-table-column label="类型" width="100">
        <template #default="scope">
          {{ TaskTypeEnum.getByValue(scope.row.type).label }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template #default="scope">
          {{ DateUtils.formatTimestampYMDHMS(scope.row.startAt) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template #default="scope">
          {{ DateUtils.formatTimestampYMDHMS(scope.row.endAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="result" label="结果"></el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          {{ TaskStatusEnum.getByValue(scope.row.status).label }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" @click="() => {errorMsg = scope.row.errorMsg; errorVisible = true;}">异常信息</el-button>
          <el-button link type="primary" @click="() => {errorMsg = scope.row.errorStackTrace; errorVisible = true;}">异常堆栈</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next" :total="taskQueryForm.total"
                   :current-page="taskQueryForm.current"
                   :page-size="taskQueryForm.size" @current-change="taskPageChange">
    </el-pagination>
  </el-dialog>

  <el-dialog v-model="errorVisible" width="50%">
    <div>
      {{errorMsg}}
    </div>
  </el-dialog>

</template>

<script setup lang="ts">
import {JobStatusEnum, TaskStatusEnum, TaskTypeEnum} from '@/types/console-enums';
import {getCurrentInstance, reactive, ref, toRef, watch} from "vue";
import DateUtils from '@/libs/utils/DateUtils'

const {proxy}: any = getCurrentInstance();

const tasksVisible = ref(false);
const errorVisible = ref(false);
const errorMsg = ref("");

let jobInstances = ref([])
let tasks = ref([])

const props = defineProps<{visible: boolean, instanceId: string}>()

const emit = defineEmits<{ (e: 'handleClose', val: boolean): void }>()

const jobInstanceVisible = toRef(props, "visible");
const instanceId = toRef(props, "instanceId");

const jobInstanceQueryForm = reactive({
  instanceId: '',
  current: 1,
  size: 10,
  total: 0
})

const taskQueryForm = reactive({
  jobInstanceId: '',
  current: 1,
  size: 10,
  total: 0
})

watch(jobInstanceVisible, (newVal, oldVal) => {
  if (newVal) {
    jobInstanceQueryForm.instanceId = instanceId.value;
    loadJobInstances()
  }
})


const loadJobInstances = () => {
  proxy.$request.get(`/api/v1/job-instance/page`, {params: jobInstanceQueryForm}).then((response: any) => {
    let page = response.data
    jobInstances.value = page.data;
    jobInstanceQueryForm.total = page.total;
  });
}

const loadTasks = () => {
  proxy.$request.get(`/api/v1/task/page`, {params: taskQueryForm}).then((response: any) => {
    let page = response.data
    tasks.value = page.data;
    taskQueryForm.total = page.total;
  });
}

const handleJobInstancePageChange = (val: any) => {
  jobInstanceQueryForm.current = val;
  loadJobInstances();
}

const taskPageChange = (val: any) => {
  taskQueryForm.current = val;
  loadTasks();
}

const handleClose = () =>{
  emit('handleClose', true)
}
</script>
