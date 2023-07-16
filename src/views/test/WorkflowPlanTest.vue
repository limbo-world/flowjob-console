<template>
    <workflow-plan :plan="plan"></workflow-plan>
</template>

<script lang="ts" setup>

import WorkflowPlan from '@/components/workflow/WorkflowPlan.vue';
import { PlanDTO } from "@/types/swagger-ts-api";
import { PlanType } from "@/types/swagger-ts-enums";

const plan: PlanDTO = {
    planId: 'xxxxxx',
    name: 'Mock 测试的任务',
    description: 'Mock 测试的任务描述',
    planType: PlanType.WORKFLOW,
    triggerType: 1,
    scheduleOption: {
        scheduleType: 1
    },
    workflow: [
        {
            type: 1,
            attributes: { },
            retryOption: {
                retry: 3,
                retryInterval: 60
            },
            dispatchOption: {
                loadBalanceType: 1,
                cpuRequirement: 1,
                ramRequirement: 2,
                tagFilters: [
                    {
                        tagName: 'vip',
                        tagValue: '0',
                        condition: 1
                    }
                ]
            },
            executorName: 'splitTasks',
            id: 'map',
            name: 'Map作业',
            description: '拆分成 1w 家店铺的任务',
            children: [ 'map-trade', 'map-chat' ],
            triggerType: 2,
            continueWhenFail: false
        },
        {
            type: 1,
            attributes: { },
            retryOption: {
                retry: 3,
                retryInterval: 60
            },
            dispatchOption: {
                loadBalanceType: 1,
                cpuRequirement: 1,
                ramRequirement: 2,
                tagFilters: [
                    {
                        tagName: 'vip',
                        tagValue: '0',
                        condition: 1
                    }
                ]
            },
            executorName: 'syncTrade',
            id: 'map-trade',
            name: '订单作业',
            description: '同步订单的任务',
            children: [ 'reduce-performance' ],
            triggerType: 2,
            continueWhenFail: false
        },
        {
            type: 1,
            attributes: { },
            retryOption: {
                retry: 3,
                retryInterval: 60
            },
            dispatchOption: {
                loadBalanceType: 1,
                cpuRequirement: 1,
                ramRequirement: 2,
                tagFilters: [
                    {
                        tagName: 'vip',
                        tagValue: '0',
                        condition: 1
                    }
                ]
            },
            executorName: 'syncChat',
            id: 'map-chat',
            name: '聊天作业',
            description: '同步聊天记录',
            children: [ 'reduce-performance' ],
            triggerType: 2,
            continueWhenFail: false
        },
        {
            type: 1,
            attributes: { },
            retryOption: {
                retry: 3,
                retryInterval: 60
            },
            dispatchOption: {
                loadBalanceType: 1,
                cpuRequirement: 1,
                ramRequirement: 2,
                tagFilters: [
                    {
                        tagName: 'vip',
                        tagValue: '0',
                        condition: 1
                    }
                ]
            },
            executorName: 'calcPerformance',
            id: 'reduce-performance',
            name: '绩效作业',
            description: '计算绩效',
            children: [ ],
            triggerType: 2,
            continueWhenFail: false
        }
    ],
    currentVersion: '1',
    recentlyVersion: '2'
}

</script>