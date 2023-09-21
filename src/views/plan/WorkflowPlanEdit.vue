<template>
    <el-container>
        <el-main>

            <!-- 基础内容 -->
            <el-form :model="planRef" label-width="130px" v-loading="loading">
                <el-form-item label="名称">
                    <el-input v-model="planRef.name" :disabled="readonly" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="planRef.description" :disabled="readonly" />
                </el-form-item>
                <el-form-item label="触发方式">
                    <el-radio-group v-model="planRef.triggerType" class="ml-4" :disabled="readonly">
                        <el-radio v-for="item in TriggerTypeEnum.getArr()" :key="item.value"
                                  :label="item.value">
                            {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 调度相关 -->
                <ScheduleOptionComponent v-model:option="planRef.scheduleOption" :disabled="readonly"/>

                <!-- DAG -->
                <el-form-item label="作业 DAG">
                    <workflow-plan-dag ref="dagRef" :plan="planRef" :readonly="readonly"></workflow-plan-dag>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="savePlan(planRef)">保存</el-button>
                </el-form-item>

                

            </el-form>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref } from 'vue'
import { TriggerTypeEnum } from '@/types/console-enums'
import ScheduleOptionComponent from '@/components/plan/ScheduleOptionComponent.vue'
import WorkflowPlanDag from '@/components/workflow/WorkflowPlanDag.vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { PlanDTO } from '@/types/swagger-ts-api';
import { createEmptyPlan } from '@/components/workflow/WorkflowPlanFunctions';

const { proxy }: any = getCurrentInstance();

const router = useRouter();
const planId = router.currentRoute.value.query.planId as string;
const loading = ref(true);
const readonly = ref(router.currentRoute.value.query.readonly === '1');

const planRef = ref<PlanDTO>(createEmptyPlan());
const dagRef = ref();

onMounted(async () => {
    // 加载任务
    const plan = await loadPlan(planId);
    console.log('加载任务', plan);
    planRef.value = plan;

    loading.value = false;

    // 更新 DAG
    dagRef.value.refresh(plan);
});


/**
 * 加载任务
 * @param planId 任务 ID
 */
async function loadPlan(planId?: string): Promise<PlanDTO> {
    if (!planId || planId === '') {
        return new Promise((resolve) => resolve(createEmptyPlan()));
    }

    return proxy.$request
        .get(`/api/v1/workflow-plan/get`, { params: { planId: planId } })
        .then((response: any) => {
            const p = response.data as PlanDTO
            p.dagData = { nodes: new Map() };
            return p;
        });
}


/**
 * 保存工作流任务
 * @param plan 任务
 */
async function savePlan(plan: PlanDTO) {
    console.log(planRef.value)
    const planParam = JSON.parse(JSON.stringify(planRef.value)) as PlanDTO;

    // 根据id判断更新还是新增
    if (planId) {
        proxy.$request.post(`/api/v1/workflow-plan/update?planId=${planId}`, planParam)
            .then((response: any) => {
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
            .catch((reject: any) => {
                ElMessage({
                    showClose: true,
                    message: reject.message,
                    type: 'error',
                    duration: 3000
                })
            })
    } else {
        proxy.$request.post(`/api/v1/workflow-plan/add`, planParam)
            .then((response: any) => {
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            })
            .catch((reject: any) => {
                ElMessage({
                    showClose: true,
                    message: reject.message,
                    type: 'error',
                    duration: 3000
                })
            })
    }
}


</script>

<style lang="scss">
</style>
