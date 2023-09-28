<template>
    <el-container>
        <el-main>
            <!-- 基础内容 -->
            <el-form :model="planRef" label-width="130px">
                <el-form-item label="名称">
                    <el-input v-model="planRef.name" :disabled="disabled" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="planRef.description" :disabled="disabled" />
                </el-form-item>
                <el-form-item label="触发方式">
                    <el-radio-group v-model="planRef.triggerType" class="ml-4" :disabled="disabled">
                        <el-radio v-for="item in TriggerTypeEnum.getArr()"  :key="item.value"
                                  :label="item.value">{{ item.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>

        <template v-if="TriggerTypeEnum.SCHEDULE.value === planRef.triggerType">
            <!-- 调度相关 -->
            <ScheduleOptionComponent v-model:option="planRef.scheduleOption" :disabled="disabled" />
        </template>

                <!-- 普通任务 -->
                <el-form-item label="任务类型">
                    <el-radio-group v-model="planRef.type" class="ml-4" :disabled="disabled">
                        <el-radio v-for="item in JobTypeEnum.getArr()"
                                  :key="item.value" :label="item.value">
                            {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="执行器名称">
                    <el-input v-model="planRef.executorName" :disabled="disabled" />
                </el-form-item>

                <!-- 属性 -->
                <JobAttrComponent v-model:attributes="planRef.attributes" :disabled="disabled"/>

                <!-- 重试 -->
                <!-- <RetryOptionComponent :job-type="jobRef.type" :option="jobRef.retryOption" :disabled="disabled"/> -->

                    <!-- 负载 -->
                <!-- <DispatchOptionComponent :option="jobRef.dispatchOption" :disabled="disabled"/> -->

                <el-form-item>
                    <el-button v-if="!disabled" type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>

            </el-form>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, Ref, ref, toRef } from 'vue'
import { JobTypeEnum, LoadBalanceTypeEnum, TriggerTypeEnum } from '@/types/console-enums'
import ScheduleOptionComponent from '@/components/plan/ScheduleOptionComponent.vue'
import RetryOptionComponent from '@/components/plan/RetryOptionComponent.vue'
import DispatchOptionComponent from '@/components/plan/DispatchOptionComponent.vue'
import JobAttrComponent from '@/components/plan/JobAttrComponent.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { NormalPlanInfoDTO, ScheduleOptionDTO } from '@/types/swagger-ts-api'
import { createEmptyNormalPlan, createEmptyPlan } from '@/components/workflow/WorkflowPlanFunctions'

const { proxy }: any = getCurrentInstance();

const router = useRouter();
const planId = router.currentRoute.value.query.planId as string;
const disabled: Ref<boolean> = ref(router.currentRoute.value.query.edit !== "true");

const planRef = ref<NormalPlanInfoDTO>(createEmptyNormalPlan());

onMounted(async () => {
    // 加载任务
    const plan = await loadPlan(planId);
    console.log('加载任务', plan);
    planRef.value = plan;
});


/**
 * 加载任务
 * @param planId 任务 ID
 */
 async function loadPlan(planId?: string): Promise<NormalPlanInfoDTO> {
    if (!planId || planId === '') {
        return new Promise((resolve) => resolve(createEmptyNormalPlan()));
    }

    return proxy.$request
        .get(`/api/v1/plan/get`, { params: { planId: planId } })
        .then((response: any) => {
            const p = response.data as NormalPlanInfoDTO

            // 处理 attributes 的类型为 Map
            if (p.attributes) {
                const obj = p.attributes as object;
                p.attributes = new Map(Object.entries(obj));
            } else {
                p.attributes = new Map();
            }
            return p;
        });
}

const onSubmit = () => {
    // 处理 attributes，防止序列化传递失败
    const planParam = JSON.parse(JSON.stringify(planRef.value))
    planParam.attributes = Object.fromEntries(planRef.value.attributes);
    console.log(JSON.stringify(planParam))

    // 根据id判断更新还是新增
    if (planId) {
        proxy.$request.post(`/api/v1/plan/update?planId=${planId}`, planParam)
            .then((response: any) => {
                ElMessage({
                    message: '操作成功',
                    type: 'success',
                })
            }).catch((reject: any) => {
                ElMessage({
                    showClose: true,
                    message: reject.message,
                    type: 'error',
                    duration: 3000
                })
            })
    } else {
        proxy.$request.post(`/api/v1/plan/add`, planParam).then((response: any) => {
            ElMessage({
                message: '操作成功',
                type: 'success',
            })
        }).catch((reject: any) => {
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

<style lang="scss"></style>
