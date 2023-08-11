<template>
    <el-drawer v-model="visible" size="60%" :show-close="false" :before-close="confirmSave">
        <el-form :model="job">
            
            <el-form-item label="任务类型" label-width="100px">
                <el-radio-group v-model="job.type" class="ml-4" :disabled="readOnly">
                    <el-radio v-for="item in JobTypeEnum.getArr()" :key="item.value" :label="item.value">
                        {{item.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="作业名称" label-width="100px">
                <el-input v-model="job.name" :disabled="readOnly"/>
            </el-form-item>

            <el-form-item label="执行器名称" label-width="100px">
                <el-input v-model="job.executorName" :disabled="readOnly"/>
            </el-form-item>

            <!-- 属性 -->
            <JobAttrComponent :attributes="job.attributes" :disabled="readOnly" label-width="100px"
                              @onChange="(v) => job.attributes = v"/>

            <!-- 重试 -->
            <RetryOptionComponent :job-type="job.type" :option="job.retryOption" label-width="100px"
                                :disabled="readOnly" @onChange="v => job.retryOption = v"/>

            <!-- 负载 -->
            <DispatchOptionComponent :option="job.dispatchOption" :disabled="readOnly" label-width="100px"
                                    @onChange="v => job.dispatchOption = v"/>

            <el-form-item>
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>


<script setup lang="ts">
import JobAttrComponent from '@/components/plan/JobAttrComponent.vue'
import RetryOptionComponent from '@/components/plan/RetryOptionComponent.vue'
import DispatchOptionComponent from '@/components/plan/DispatchOptionComponent.vue'
import { JobTypeEnum, LoadBalanceTypeEnum, TriggerTypeEnum } from '@/types/console-enums';
import { WorkflowJobDTO } from "@/types/swagger-ts-api";
import { readonly, ref } from "vue";
import { ElMessageBox } from 'element-plus';


const visible = ref(false);
const readOnly = ref(false);

const job = ref<WorkflowJobDTO>();

/**
 * 作业变更事件
 */
const emits = defineEmits<{ (e: 'jobChange', job: WorkflowJobDTO): void }>();


/**
 * 展示作业编辑抽屉
 * @param j 要编辑的作业
 */
function showDrawer(j: WorkflowJobDTO) {
    if (j == null || j == undefined) {
        console.error(`入参作业为空`, j);
        return;
    }

    job.value = JSON.parse(JSON.stringify(j));
    visible.value = true;
}


/**
 * 确认是否保存作业数据，不保存则继续处理，保存则触发作业变更事件，并关闭抽屉
 */
function confirmSave(done: () => void) {
    ElMessageBox.confirm('是否保存更新？', { distinguishCancelAndClose: true })
        .then(() => {
            emits('jobChange', job.value as WorkflowJobDTO)
            done();
        })
        .catch(action => {
            if (action === 'close') {
                return;
            } else if (action === 'cancel') {
                done()
            }
        });
}


/**
 * 保存作业数据
 */
function save() {
    emits('jobChange', job.value as WorkflowJobDTO);
    visible.value = false;
}

/**
 * 组件暴露的方法
 */
defineExpose({
    showDrawer
});

</script>

<style>
.el-form-item .el-form-item {
    margin-bottom: 18px;
}
</style>
