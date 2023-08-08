<template>
  <el-form-item label="负载方式" :label-width="labelWidth">
    <el-radio-group v-model="option.loadBalanceType" class="ml-4" @change="onChange" :disabled="disabled">
      <el-radio v-for="item in LoadBalanceTypeEnum.getArr()" :label="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="所需CPU数" :label-width="labelWidth">
    <el-input v-model="option.cpuRequirement" @change="onChange" :disabled="disabled"/>
  </el-form-item>
  <el-form-item label="所需内存大小" :label-width="labelWidth">
    <el-input v-model="option.ramRequirement" @change="onChange" :disabled="disabled"/>
  </el-form-item>
  <el-form-item label="过滤标签" :label-width="labelWidth">
    <el-table :data="option.tagFilters">
      <el-table-column label="键" align="center">
        <template #default="scope">
          <el-input v-model="scope.row.tagName" @change="onChange" :disabled="disabled"/>
        </template>
      </el-table-column>
      <el-table-column label="值" align="center">
        <template #default="scope">
          <el-input v-model="scope.row.tagValue" @change="onChange" :disabled="disabled"/>
        </template>
      </el-table-column>
      <el-table-column label="条件" align="center">
        <template #default="scope">
          <el-select v-model="scope.row.condition" placeholder="请选择" :disabled="disabled">
            <el-option v-for="item in TagFilterConditionEnum.getArr()" :key="item.value" :label="item.label"
                       :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <el-button @click="addTagFilterRow" size="small" type="primary" :icon="Plus" circle :disabled="disabled"></el-button>
        </template>
        <template #default="scope">
          <el-popconfirm width="200" confirm-button-text="确认" cancel-button-text="取消" title="确定删除？"
                         @confirm="removeTagFilterRow(scope.$index)">
            <template #reference>
              <el-button size="small" type="danger" :icon="Minus" circle :disabled="disabled"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-form-item>
</template>

<script setup lang="ts">
import {Minus, Plus} from '@element-plus/icons-vue'
import {LoadBalanceTypeEnum, TagFilterConditionEnum} from '@/types/console-enums';
import {toRef} from "vue";

interface TagFilter {
  tagName: string,
  tagValue: string,
  condition: number
}

interface DispatchOption {
  loadBalanceType?: number,
  cpuRequirement?: number,
  ramRequirement?: number,
  tagFilters?: Array<TagFilter>
}

const props = defineProps<{ 
  option: DispatchOption, 
  disabled: boolean,
  labelWidth: string | number
}>()

let option = toRef(props, "option")
const labelWidth = toRef(props, "labelWidth");

const emit = defineEmits<{ (e: 'onChange', val: DispatchOption): void }>()

const onChange = () => {
  emit('onChange', option.value)
}

const addTagFilterRow = () => {
  option.value.tagFilters?.push({
    tagName: "",
    tagValue: "",
    condition: TagFilterConditionEnum.EXISTS.value
  } as TagFilter)
}

const removeTagFilterRow = (idx: number) => {
  option.value.tagFilters?.splice(idx, 1);
  onChange();
}

</script>


<style lang="scss">
.el-form-item__label {
  font-weight: 700;
}
</style>