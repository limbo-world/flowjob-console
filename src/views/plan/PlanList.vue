<template>
  <el-container>
    <el-header class="padding-top-xs" height="50px">
      <el-form ref="searchForm" :inline="true">
        <el-form-item label="名称">
          <el-input v-model="queryForm.name" placeholder="输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadPlans" :icon="Search">查询</el-button>
          <el-button type="primary" @click="() =>{dialogOpened = true;}" :icon="CirclePlus">新增</el-button>
        </el-form-item>
      </el-form>
    </el-header>

    <el-main>
      <el-table :data="plans">
        <el-table-column prop="planId" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="是否启用" width="100">
          <template #default="scope">
            {{ scope.row.enabled ? "已启用" : "未启用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <div class="operations">
            </div>
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

const {proxy}: any = getCurrentInstance();

const queryForm = reactive({
  name: '',
  current: 1,
  size: 20,
  total: 0
})

let plans = ref([])

const loadPlans = () => {
  proxy.$request.get(`/api/v1/plan`, {params: queryForm}).then((response: any) => {
    let page = response.data
    plans.value = page.data;
    queryForm.total = page.total;
  });
}

// 初始化
loadPlans();

</script>

<style lang="scss">
.el-table {
  .operations {
    .el-buttion {
      font-size: 10px;
    }
  }
}
</style>
