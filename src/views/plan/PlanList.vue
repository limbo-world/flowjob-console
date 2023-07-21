<template>
  <el-container>
    <el-header class="padding-top-xs" height="50px">
      <el-form ref="searchForm" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadPlans" :icon="Search">查询</el-button>
          <el-button type="primary" @click="() => toNormalInfo(null)" :icon="CirclePlus">新增普通任务</el-button>
          <el-button type="primary" @click="() => toWorkflowInfo(null)" :icon="CirclePlus">新增工作流任务</el-button>
        </el-form-item>
      </el-form>
    </el-header>

    <el-main>
      <el-table :data="plans">
        <el-table-column prop="planId" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="调度配置">
          <template #default="scope">
            {{AppConstants.ScheduleType.getByValue(scope.row.scheduleType).label}}
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.enabled"
                       @change="v => {changeEnable(scope.row.planId, v)}"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button link type="primary" @click="toInfo(scope.row.planId)">查看</el-button>
            <el-button link type="primary" @click="toInfo(scope.row.planId)">编辑</el-button>
            <el-button link type="primary" @click="toInfo(scope.row.planId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <el-pagination background layout="total, prev, pager, next" :total="queryForm.total"
                     :current-page.sync="queryForm.current"
                     :page-size="queryForm.size" @current-change="loadPlans">
      </el-pagination>
    </el-footer>

  </el-container>
</template>

<script setup lang="ts">
import {Edit, CirclePlus, Search} from '@element-plus/icons-vue'
import {getCurrentInstance, ref, reactive} from "vue";
import { useRouter } from 'vue-router'
import AppConstants from '@/libs/utils/AppConstants';

const {proxy}: any = getCurrentInstance();

let router = useRouter();

const queryForm = reactive({
  name: '',
  current: 1,
  size: 20,
  total: 0
})

let plans = ref([])

// 加载列表
const loadPlans = () => {
  proxy.$request.get(`/api/v1/plan`, {params: queryForm}).then((response: any) => {
    let page = response.data
    plans.value = page.data;
    queryForm.total = page.total;
  });
}

// 切换开关
const changeEnable = (planId: any, enable: any) => {
  console.log(planId, enable)
  if (enable) {
    proxy.$request.post(`/api/v1/plan/start?planId=${planId}`).then((response: any) => {
      loadPlans();
    })
  } else {
    proxy.$request.post(`/api/v1/plan/stop?planId=${planId}`).then((response: any) => {
      loadPlans();
    })
  }
}

// 跳转到详情
const toNormalInfo = (planId: any) => {
  router.push({path: '/normal-plan/edit',
    query: {planId: planId}
  })
}
const toWorkflowInfo = (planId: any) => {
  router.push({path: '/workflow-plan/edit',
    query: {planId: planId}
  })
}

// 初始化
loadPlans();

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
