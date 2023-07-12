/*
 * Copyright 2020-2024 Limbo Team (https://github.com/limbo-world).
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   	http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

const PlanType: LabelEnum[] = [
    {label: '普通任务', value: 1},
    {label: '工作流任务', value: 2}
];

const JobType: LabelEnum[] = [
    {label: '普通类型', value: 1},
    {label: '广播类型', value: 2},
    {label: 'Map任务', value: 3},
    {label: 'MapReduce任务', value: 4},
];

const LoadBalanceType: LabelEnum[] = [
    {label: '随机', value: 1},
    {label: '轮询', value: 2},
    {label: '指定节点', value: 3},
    {label: '最不经常使用', value: 4},
    {label: '最近最少使用', value: 4},
    {label: '一致性hash', value: 4},
];

const TriggerType: Array<LabelEnum> = [
    {label: 'api触发', value: 1},
    {label: '调度触发', value: 2}
];

const ScheduleType: Array<LabelEnum> = [
    {label: '固定速度', value: 1},
    {label: '固定延迟', value: 2},
    {label: 'CRON表达式', value: 3},
];

const CRONType: Array<LabelEnum> = [
    {label: 'QUARTZ', value: 'QUARTZ'},
    {label: 'CRON4J', value: 'CRON4J'},
    {label: 'UNIX', value: 'UNIX'},
    {label: 'SPRING', value: 'SPRING'},
];

const RetryType: Array<LabelEnum> = [
    {label: '重试所有', value: 2},
    {label: '失败重试', value: 3},
];



export default {
    PlanType,
    JobType,
    LoadBalanceType,
    TriggerType,
    ScheduleType,
    CRONType,
    RetryType,
}
