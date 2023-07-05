<template>
  <el-container>
    <el-main>
        <el-form :model="form" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="普通任务" value="shanghai" />
              <el-option label="工作流任务" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="调度方式">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="普通任务" value="shanghai" />
              <el-option label="工作流任务" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="触发方式">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="普通任务" value="shanghai" />
              <el-option label="工作流任务" value="beijing" />
            </el-select>
          </el-form-item>

          <!-- 普通任务 -->
          <el-form-item label="任务类型">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="普通任务" value="shanghai" />
              <el-option label="工作流任务" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="执行器名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="重试次数">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="重试间隔">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="重试方式">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="负载方式">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="普通任务" value="shanghai" />
              <el-option label="工作流任务" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="所需CPU数">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="所需内存大小">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="form.name" />
          </el-form-item>

          <!-- 工作流任务 -->


        </el-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss">
</style>
