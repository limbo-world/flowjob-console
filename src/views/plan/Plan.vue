<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <el-avatar :size="size" :src="circleUrl" />
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="sub-title">square</div>
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar shape="square" :size="50" :src="squareUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <el-avatar shape="square" :size="size" :src="squareUrl" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>
