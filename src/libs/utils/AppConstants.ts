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

class LabelEnum {
    private labels: Array<Label>;
    private keyMap: Map<string, Label>;
    private valMap: Map<string, Label>;

    constructor(labels: Array<Label> = []) {
        this.labels = labels;
        this.keyMap = new Map<string, Label>();
        this.valMap = new Map<string, Label>();
        for (let label of labels) {
            this.keyMap.set(label.key, label);
            this.valMap.set(label.value, label);
        }
    }

    getArr(): Array<Label> {
        return this.labels;
    }

    getByKey(key:string): Label {
        return  this.keyMap.get(key) as Label;
    }

    getByValue(val:string): Label {
        return  this.valMap.get(val) as Label;
    }

}

const PlanType: LabelEnum = new LabelEnum([
    {key: "NORMAL", label: '普通任务', value: 1},
    {key: "WORKFLOW", label: '工作流任务', value: 2}
] as Array<Label>);

const JobType: LabelEnum = new LabelEnum([
    {key: "NORMAL", label: '普通类型', value: 1},
    {key: "BROADCAST", label: '广播类型', value: 2},
    {key: "MAP", label: 'Map任务', value: 3},
    {key: "MAP_REDUCE", label: 'MapReduce任务', value: 4},
] as Array<Label>);

const LoadBalanceType: LabelEnum = new LabelEnum([
    {key: "RANDOM", label: '随机', value: 1},
    {key: "ROUND_ROBIN", label: '轮询', value: 2},
    {key: "APPOINT", label: '指定节点', value: 3},
    {key: "LEAST_FREQUENTLY_USED", label: '最不经常使用', value: 4},
    {key: "LEAST_RECENTLY_USED", label: '最近最少使用', value: 4},
    {key: "CONSISTENT_HASH", label: '一致性hash', value: 4},
] as Array<Label>);

const TriggerType: LabelEnum = new LabelEnum([
    {key: "API", label: 'api触发', value: 1},
    {key: "SCHEDULE", label: '调度触发', value: 2}
] as Array<Label>);

const ScheduleType: LabelEnum = new LabelEnum([
    {key: "FIXED_RATE", label: '固定速度', value: 1},
    {key: "FIXED_DELAY", label: '固定延迟', value: 2},
    {key: "CRON", label: 'CRON表达式', value: 3},
] as Array<Label>);

const CRONType: LabelEnum = new LabelEnum([
    {key: "CRON4J", label: 'QUARTZ', value: 'QUARTZ'},
    {key: "CRON4J", label: 'CRON4J', value: 'CRON4J'},
    {key: "UNIX", label: 'UNIX', value: 'UNIX'},
    {key: "SPRING", label: 'SPRING', value: 'SPRING'},
] as Array<Label>);

const RetryType: LabelEnum = new LabelEnum([
    {key: "ALL", label: '重试所有', value: 2},
    {key: "ONLY_FAIL_PART", label: '失败重试', value: 3},
] as Array<Label>);

const getArray = (obj: any) => {
    const arr: Array<Label> = [];
    Object.values(obj).forEach(val => {
        arr.push(val as Label);
    })
    return arr;
}

const getLabel = (val: any, types: Array<Label>) => {
    for (let type of types) {
        if (type.value === val) {
            return type.label;
        }
    }
    return "";
}


export default {
    PlanType,
    JobType,
    LoadBalanceType,
    TriggerType,
    ScheduleType,
    CRONType,
    RetryType,
    getLabel,
    getArray,
}
