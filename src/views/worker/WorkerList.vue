<template>
  <el-container>
    <el-header class="padding-top-xs" height="50px">
      <el-form ref="searchForm" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadWorkers" :icon="Search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>

    <el-main>
      <el-table :data="workers">
        <el-table-column prop="workerId" label="ID" width="150"></el-table-column>
        <el-table-column prop="name" label="名称" width="150"></el-table-column>
        <el-table-column label="地址" width="200">
          <template #default="scope">
            {{ scope.row.protocol + "//" + scope.row.host + ":" + scope.row.port }}
          </template>
        </el-table-column>
        <el-table-column prop="availableCpu" label="剩余CPU" width="100"></el-table-column>
        <el-table-column prop="availableRam" label="剩余内存/MB" width="100"></el-table-column>
        <el-table-column prop="availableQueueLimit" label="剩余队列" width="100"></el-table-column>
        <el-table-column label="标签">
          <template #default="scope">
            <el-tag v-for="(property, idx) in scope.row.tags" :key="property" type="success">{{property.key + ":" + property.value}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            {{WorkerStatusEnum.getByValue(scope.row.status).label}}
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.enabled"
                       @change="v => {changeEnable(scope.row.workerId, v)}"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <el-pagination background layout="total, prev, pager, next" :total="queryForm.total"
                     :current-page.sync="queryForm.current"
                     :page-size="queryForm.size" @current-change="loadWorkers">
      </el-pagination>
    </el-footer>

  </el-container>
</template>

<script setup lang="ts">
import {Edit, CirclePlus, Search} from '@element-plus/icons-vue'
import {getCurrentInstance, ref, reactive} from "vue";
import {WorkerStatusEnum} from '@/types/console-enums';

const {proxy}: any = getCurrentInstance();

const queryForm = reactive({
  name: '',
  current: 1,
  size: 10,
  total: 0
})

let workers = ref([])

const loadWorkers = () => {
  proxy.$request.get(`/api/v1/worker`, {params: queryForm}).then((response: any) => {
    let page = response.data
    workers.value = page.data;
    queryForm.total = page.total;
  });
}

// 切换开关
const changeEnable = (workerId: any, enable: any) => {
  console.log(workerId, enable)
  if (enable) {
    proxy.$request.post(`/api/v1/worker/start?workerId=${workerId}`).then((response: any) => {
      loadWorkers();
    })
  } else {
    proxy.$request.post(`/api/v1/worker/stop?workerId=${workerId}`).then((response: any) => {
      loadWorkers();
    })
  }
}

// 初始化
loadWorkers();

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
