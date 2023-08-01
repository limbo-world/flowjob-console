<template>
  <el-form-item label="属性参数">
    <el-table :data="attributeArr">
      <el-table-column label="键" align="center">
        <template #default="scope">
          <el-input v-model="scope.row.key" @change="onChange" :disabled="disabled"/>
        </template>
      </el-table-column>
      <el-table-column label="值" align="center">
        <template #default="scope">
          <el-input v-model="scope.row.value" @change="onChange" :disabled="disabled"/>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #header>
          <el-button @click="addAttributeRow" size="small" type="primary" :icon="Plus" circle :disabled="disabled"></el-button>
        </template>
        <template #default="scope">
          <el-popconfirm width="200" confirm-button-text="确认" cancel-button-text="取消" title="确定删除？"
                         @confirm="removeAttributeRow(scope.$index)">
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
import {ref, toRef, watch} from "vue";
import {Minus, Plus} from '@element-plus/icons-vue'

interface Attribute {
  key: string,
  value: string
}

interface AttributeResult {
  [key: string]: any; // 动态属性
}

const props = defineProps<{ attributes: {}, disabled: boolean }>()

let attributeArr = ref([] as Attribute[]);
const attributes = toRef(props, "attributes");

watch(attributes, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  const keys = Object.keys(newVal);
  const newAttributeArr = []
  for (let key of keys) {
    newAttributeArr.push({
      key: key,
      value: newVal[key]
    });
  }
  attributeArr.value = newAttributeArr;
})

const emit = defineEmits<{ (e: 'onChange', val: {}): void }>()

const addAttributeRow = () => {
  attributeArr.value.push({key: "", value: ""} as Attribute)
}

const removeAttributeRow = (idx: number) => {
  attributeArr.value.splice(idx, 1);
  onChange();
}

const onChange = () => {
  const result: AttributeResult = {};
  for (let attribute of attributeArr.value) {
    result[attribute.key] = attribute.value;
  }
  emit('onChange', result)
}
</script>
