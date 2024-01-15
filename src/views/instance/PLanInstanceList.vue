<template>
  <el-container>
    <el-header class="padding-top-xs" height="50px">
      <el-form ref="searchForm" :inline="true">
        <el-form-item label="期望触发时间">
          <el-date-picker
              v-model="triggerAtSelect"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadPlanInstances" :icon="Search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>

    <el-main>
      <el-table :data="planInstances">
        <el-table-column prop="planInstanceId" label="ID" width="150"></el-table-column>
        <el-table-column label="触发类型" width="100">
          <template #default="scope">
            {{ TriggerTypeEnum.getByValue(scope.row.triggerType).label }}
          </template>
        </el-table-column>
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
            {{ DateUtils.formatTimestampYMDHMS(scope.row.feedbackAt) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            {{ PlanStatusEnum.getByValue(scope.row.status).label }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="loadDetail(scope.$index, scope.row.planInstanceId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <el-pagination background layout="total, prev, pager, next" :total="queryForm.total"
                     :current-page="queryForm.current"
                     :page-size="queryForm.size" @current-change="handleCurrentChange">
      </el-pagination>
    </el-footer>

  </el-container>

  <InstanceDetailComponent :visible="jobInstanceVisible" :instanceId="selectPlanInstanceId" @handleClose="() => jobInstanceVisible=false" />
</template>

<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {getCurrentInstance, reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import {PlanStatusEnum, TriggerTypeEnum} from '@/types/console-enums';
import InstanceDetailComponent from '@/components/plan/InstanceDetailComponent.vue'
import DateUtils from '@/libs/utils/DateUtils'

const {proxy}: any = getCurrentInstance();

const router = useRouter();
const planId = router.currentRoute.value.query.planId;

const jobInstanceVisible = ref(false);
const selectPlanInstanceId = ref();


const triggerAtSelect = ref<[string, string]>(['', ''])
const queryForm = reactive({
  triggerAtBegin: '',
  triggerAtEnd: '',
  planId: planId,
  current: 1,
  size: 10,
  total: 0
})

const planInstances = ref([])

// 加载列表
const loadPlanInstances = () => {
  queryForm.triggerAtBegin = triggerAtSelect.value[0];
  queryForm.triggerAtEnd = triggerAtSelect.value[1];
  proxy.$request.get(`/api/v1/plan-instance/page`, {params: queryForm}).then((response: any) => {
    let page = response.data
    planInstances.value = page.data;
    queryForm.total = page.total;
  });
}

const loadDetail = (idx: number, planInstanceId: string) => {
  // 如果是普通的 抽屉
  jobInstanceVisible.value = true
  selectPlanInstanceId.value = planInstanceId
  // 如果是 工作流 详情
}

const handleCurrentChange = (val: any) => {
  queryForm.current = val;
  loadPlanInstances();
}

// 初始化
loadPlanInstances();

</script>

<style lang="scss">
.el-table {
  .operations {
    .el-button {
      font-size: 10px;
    }
  }
}
</style>
