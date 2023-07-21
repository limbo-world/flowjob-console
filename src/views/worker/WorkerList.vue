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
        <el-table-column prop="workerId" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="protocol" label="通信协议"></el-table-column>
        <el-table-column label="地址">
          <template #default="scope">
            {{ scope.row.host + ":" + scope.row.port }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            {{AppConstants.WorkerStatus.getByValue(scope.row.status).label}}
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template #default="scope">
            <el-tag v-for="(property, idx) in scope.row.tags" :key="property" type="success">{{property.key + ":" + property.value}}
            </el-tag>
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
import AppConstants from '@/libs/utils/AppConstants';

const {proxy}: any = getCurrentInstance();

const queryForm = reactive({
  name: '',
  current: 1,
  size: 20,
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
