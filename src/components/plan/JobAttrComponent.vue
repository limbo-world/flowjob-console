<template>
    <el-form-item label="属性参数" label-width="130px">
        <el-table :data="attributeItems">
            <el-table-column label="键" align="center">
                <template #default="scope">
                    <el-input v-model="scope.row.key" :disabled="disabled" @change="emitAttibutesChange" />
                </template>
            </el-table-column>
            <el-table-column label="值" align="center">
                <template #default="scope">
                    <el-input v-model="scope.row.value" :disabled="disabled" @change="emitAttibutesChange" />
                </template>
            </el-table-column>
            <el-table-column align="center">
                <template #header>
                    <el-button @click="addAttributeItem"
                        size="small" type="primary" :icon="Plus" circle :disabled="disabled"></el-button>
                </template>
                <template #default="scope">
                    <el-popconfirm width="200" confirm-button-text="确认" cancel-button-text="取消" title="确定删除？"
                        @confirm="() => removeAttributeItem(scope.$index)">
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
import { Ref, ref, toRef, watch } from "vue";
import { Minus, Plus } from '@element-plus/icons-vue'

interface AttributeItem {
    key: string,
    value: string
}

const props = defineProps<{
    attributes: Map<string, string>,
    disabled: boolean
}>();


// v-model:attributes 接收外部数据变化
const attributeItems: Ref<AttributeItem[]> = ref(attributeToItems(props.attributes));
watch(toRef(props, 'attributes'), (newValue) => {
    if (newValue) {
        console.log('JobAttr 属性 更新', newValue, newValue);
        attributeItems.value = attributeToItems(newValue);
    }
})

// v-model:attributes 内部数据向外传递
const emitAttributesUpdate = defineEmits<{
    (
        e: 'update:attributes',
        val: Map<string, string>
    ): void
}>();


/**
 * 触发 attributes 属性更新
 */
function emitAttibutesChange() {
    const newAttr: Map<string, string> = new Map();
    attributeItems.value.forEach(i => newAttr.set(i.key, i.value))
    emitAttributesUpdate('update:attributes', newAttr);
    console.log('JobAttr 更新', newAttr);
}


/**
 * 新增一个属性键值对
 */
function addAttributeItem() {
    attributeItems.value.push({
        key: '',
        value: ''
    });
    emitAttibutesChange();
}


/**
 * 移除一个属性键值对
 * @param index 索引下标
 */
function removeAttributeItem(index: number) {
    attributeItems.value.splice(index, 1);
    emitAttibutesChange();
}


/**
 * 将属性 Map 转换为属性条目数组格式，用于表格渲染
 * @param attr 属性 Map
 */
function attributeToItems(attr: Map<string,  string>): AttributeItem[] {
    if (!attr) {
        return [];
    }

    const items: AttributeItem[] = [];

    if (typeof attr == "object") {
      for (let key in attr) {
        items.push({"key": key, "value": attr[key]})
      }
    } else {
      attr.forEach((value, key) => {
        items.push({key, value})
      });
    }
    return items;
}

</script>
