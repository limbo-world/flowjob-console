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


export default {
    PlanType,
    TriggerType,
    ScheduleType,
    CRONType,
}
