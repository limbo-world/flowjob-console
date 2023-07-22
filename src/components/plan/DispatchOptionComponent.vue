<template>
  <el-form-item label="负载方式">
    <el-radio-group v-model="option.loadBalanceType" class="ml-4" @change="onChange">
      <el-radio v-for="item in LoadBalanceTypeEnum.getArr()" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="所需CPU数">
    <el-input v-model="option.cpuRequirement" @change="onChange"/>
  </el-form-item>
  <el-form-item label="所需内存大小">
    <el-input v-model="option.ramRequirement" @change="onChange"/>
  </el-form-item>
<!--  <el-form-item label="标签">-->
<!--    <el-tag v-for="(itemCategory, idx) in option.tags" :key="itemCategory.text" closable @close="removeCategoryType(idx)"-->
<!--            type="success" size="big" :disable-transitions="false">{{itemCategory.text}}-->
<!--    </el-tag>-->
<!--    <el-input v-model="option.tagFilters" @change="onChange"/>-->
<!--  </el-form-item>-->
</template>

<script setup lang="ts">
import {LoadBalanceTypeEnum} from '@/types/console-enums';
import {ref, toRef} from "vue";

interface DispatchOption {
  loadBalanceType?: number,
  cpuRequirement?: number,
  ramRequirement?: number,
  tagFilters?: string,
}

const props = defineProps<{ option: DispatchOption }>()

let option = toRef(props, "option")

const emit = defineEmits<{ (e: 'onChange', val: DispatchOption): void }>()

const onChange = () => {
  emit('onChange', option.value)
}
</script>
