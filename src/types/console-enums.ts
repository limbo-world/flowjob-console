
export class PlanTypeEnum {

    /**
     * 未知
     */
    public static UNKNOWN: Label = {label: '未知', value: 0};

    /**
     * 普通任务
     */
    public static NORMAL: Label = {label: '普通任务', value: 1};

    /**
     * 工作流任务
     */
    public static WORKFLOW: Label = {label: '工作流任务', value: 2};

    private static valMap: Map<string, Label>;

    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(PlanTypeEnum.UNKNOWN.value, PlanTypeEnum.UNKNOWN);
        this.valMap.set(PlanTypeEnum.NORMAL.value, PlanTypeEnum.NORMAL);
        this.valMap.set(PlanTypeEnum.WORKFLOW.value, PlanTypeEnum.WORKFLOW);
    }

    static getArr(): Array<Label> {
        return [PlanTypeEnum.NORMAL, PlanTypeEnum.WORKFLOW];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }

}

export class JobTypeEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static NORMAL: Label = {label: '普通类型', value: 1};
    public static BROADCAST: Label = {label: '广播类型', value: 2};
    public static MAP: Label = {label: 'Map任务', value: 3};
    public static MAP_REDUCE: Label = {label: 'MapReduce任务', value: 4};

    private static valMap: Map<string, Label>;

    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(JobTypeEnum.UNKNOWN.value, JobTypeEnum.UNKNOWN);
        this.valMap.set(JobTypeEnum.NORMAL.value, JobTypeEnum.NORMAL);
        this.valMap.set(JobTypeEnum.BROADCAST.value, JobTypeEnum.BROADCAST);
        this.valMap.set(JobTypeEnum.MAP.value, JobTypeEnum.MAP);
        this.valMap.set(JobTypeEnum.MAP_REDUCE.value, JobTypeEnum.MAP_REDUCE);
    }

    static getArr(): Array<Label> {
        return [JobTypeEnum.NORMAL, JobTypeEnum.BROADCAST, JobTypeEnum.MAP, JobTypeEnum.MAP_REDUCE];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class LoadBalanceTypeEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static RANDOM: Label = {label: '随机', value: 1};
    public static ROUND_ROBIN: Label = {key: "ROUND_ROBIN", label: '轮询', value: 2};
    public static APPOINT: Label = {key: "APPOINT", label: '指定节点', value: 3};
    public static LEAST_FREQUENTLY_USED: Label = {key: "LEAST_FREQUENTLY_USED", label: '最不经常使用', value: 4};
    public static LEAST_RECENTLY_USED: Label = {key: "LEAST_RECENTLY_USED", label: '最近最少使用', value: 4};
    public static CONSISTENT_HASH: Label = {key: "CONSISTENT_HASH", label: '一致性hash', value: 4};

    private static valMap: Map<string, Label>;

    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(LoadBalanceTypeEnum.UNKNOWN.value, LoadBalanceTypeEnum.UNKNOWN);
        this.valMap.set(LoadBalanceTypeEnum.RANDOM.value, LoadBalanceTypeEnum.RANDOM);
        this.valMap.set(LoadBalanceTypeEnum.ROUND_ROBIN.value, LoadBalanceTypeEnum.ROUND_ROBIN);
        this.valMap.set(LoadBalanceTypeEnum.APPOINT.value, LoadBalanceTypeEnum.APPOINT);
        this.valMap.set(LoadBalanceTypeEnum.LEAST_FREQUENTLY_USED.value, LoadBalanceTypeEnum.LEAST_FREQUENTLY_USED);
        this.valMap.set(LoadBalanceTypeEnum.LEAST_RECENTLY_USED.value, LoadBalanceTypeEnum.LEAST_RECENTLY_USED);
        this.valMap.set(LoadBalanceTypeEnum.CONSISTENT_HASH.value, LoadBalanceTypeEnum.CONSISTENT_HASH);
    }

    static getArr(): Array<Label> {
        return [LoadBalanceTypeEnum.RANDOM, LoadBalanceTypeEnum.ROUND_ROBIN, LoadBalanceTypeEnum.APPOINT, LoadBalanceTypeEnum.LEAST_FREQUENTLY_USED, LoadBalanceTypeEnum.LEAST_RECENTLY_USED, LoadBalanceTypeEnum.CONSISTENT_HASH];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class TriggerTypeEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static API: Label = {key: "API", label: 'api触发', value: 1};
    public static SCHEDULE: Label = {key: "SCHEDULE", label: '调度触发', value: 2};

    private static valMap: Map<string, Label>;
    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(TriggerTypeEnum.UNKNOWN.value, TriggerTypeEnum.UNKNOWN);
        this.valMap.set(TriggerTypeEnum.API.value, TriggerTypeEnum.API);
        this.valMap.set(TriggerTypeEnum.SCHEDULE.value, TriggerTypeEnum.SCHEDULE);
    }

    static getArr(): Array<Label> {
        return [TriggerTypeEnum.API, TriggerTypeEnum.SCHEDULE];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class ScheduleTypeEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static FIXED_RATE: Label = {key: "FIXED_RATE", label: '固定速度', value: 1};
    public static FIXED_DELAY: Label = {key: "FIXED_DELAY", label: '固定延迟', value: 2};
    public static CRON: Label = {key: "CRON", label: 'CRON表达式', value: 3};

    private static valMap: Map<string, Label>;
    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(ScheduleTypeEnum.UNKNOWN.value, ScheduleTypeEnum.UNKNOWN);
        this.valMap.set(ScheduleTypeEnum.FIXED_RATE.value, ScheduleTypeEnum.FIXED_RATE);
        this.valMap.set(ScheduleTypeEnum.FIXED_DELAY.value, ScheduleTypeEnum.FIXED_DELAY);
        this.valMap.set(ScheduleTypeEnum.CRON.value, ScheduleTypeEnum.CRON);
    }

    static getArr(): Array<Label> {
        return [ScheduleTypeEnum.FIXED_RATE, ScheduleTypeEnum.FIXED_DELAY, ScheduleTypeEnum.CRON];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class CRONTypeEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static QUARTZ: Label = {key: "QUARTZ", label: 'QUARTZ', value: 'QUARTZ'};
    public static CRON4J: Label = {key: "CRON4J", label: 'CRON4J', value: 'CRON4J'};
    public static UNIX: Label = {key: "UNIX", label: 'UNIX', value: 'UNIX'};
    public static SPRING: Label = {key: "SPRING", label: 'SPRING', value: 'SPRING'};

    private static valMap: Map<string, Label>;
    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(CRONTypeEnum.UNKNOWN.value, CRONTypeEnum.UNKNOWN);
        this.valMap.set(CRONTypeEnum.QUARTZ.value, CRONTypeEnum.QUARTZ);
        this.valMap.set(CRONTypeEnum.CRON4J.value, CRONTypeEnum.CRON4J);
        this.valMap.set(CRONTypeEnum.UNIX.value, CRONTypeEnum.UNIX);
        this.valMap.set(CRONTypeEnum.SPRING.value, CRONTypeEnum.SPRING);
    }

    static getArr(): Array<Label> {
        return [CRONTypeEnum.QUARTZ, CRONTypeEnum.CRON4J, CRONTypeEnum.UNIX, CRONTypeEnum.SPRING];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class RetryTypeEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static ALL: Label = {key: "ALL", label: '重试所有', value: 2};
    public static ONLY_FAIL_PART: Label = {key: "ONLY_FAIL_PART", label: '失败重试', value: 3};

    private static valMap: Map<string, Label>;
    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(RetryTypeEnum.UNKNOWN.value, RetryTypeEnum.UNKNOWN);
        this.valMap.set(RetryTypeEnum.ALL.value, RetryTypeEnum.ALL);
        this.valMap.set(RetryTypeEnum.ONLY_FAIL_PART.value, RetryTypeEnum.ONLY_FAIL_PART);
    }

    static getArr(): Array<Label> {
        return [RetryTypeEnum.ALL, RetryTypeEnum.ONLY_FAIL_PART];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class WorkerStatusEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static RUNNING: Label = {key: "RUNNING", label: '运行中', value: 1};
    public static FUSING: Label = {key: "FUSING", label: '熔断中', value: 2};
    public static TERMINATED: Label = {key: "TERMINATED", label: '已停止', value: 3};

    private static valMap: Map<string, Label>;
    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(WorkerStatusEnum.UNKNOWN.value, WorkerStatusEnum.UNKNOWN);
        this.valMap.set(WorkerStatusEnum.RUNNING.value, WorkerStatusEnum.RUNNING);
        this.valMap.set(WorkerStatusEnum.FUSING.value, WorkerStatusEnum.FUSING);
        this.valMap.set(WorkerStatusEnum.TERMINATED.value, WorkerStatusEnum.TERMINATED);
    }

    static getArr(): Array<Label> {
        return [WorkerStatusEnum.RUNNING, WorkerStatusEnum.FUSING, WorkerStatusEnum.TERMINATED];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}

export class TagFilterConditionEnum {
    public static UNKNOWN: Label = {label: '未知', value: 0};
    public static EXISTS: Label = {label: '存在指定名称的标签', value: 1};
    public static NOT_EXISTS: Label = {label: '不存在指定名称的标签', value: 2};
    public static MUST_MATCH_VALUE: Label = {label: '存在指定名称的标签且匹配指定值', value: 3};
    public static MUST_NOT_MATCH_VALUE: Label = {label: '存在指定名称的标签且不匹配指定值', value: 4};
    public static MUST_MATCH_VALUE_REGEX: Label = {label: '存在指定名称的标签且匹配正则表达式', value: 4};

    private static valMap: Map<string, Label>;
    static {
        this.valMap = new Map<string, Label>();
        this.valMap.set(TagFilterConditionEnum.UNKNOWN.value, TagFilterConditionEnum.UNKNOWN);
        this.valMap.set(TagFilterConditionEnum.EXISTS.value, TagFilterConditionEnum.EXISTS);
        this.valMap.set(TagFilterConditionEnum.NOT_EXISTS.value, TagFilterConditionEnum.NOT_EXISTS);
        this.valMap.set(TagFilterConditionEnum.MUST_MATCH_VALUE.value, TagFilterConditionEnum.MUST_MATCH_VALUE);
        this.valMap.set(TagFilterConditionEnum.MUST_NOT_MATCH_VALUE.value, TagFilterConditionEnum.MUST_NOT_MATCH_VALUE);
        this.valMap.set(TagFilterConditionEnum.MUST_MATCH_VALUE_REGEX.value, TagFilterConditionEnum.MUST_MATCH_VALUE_REGEX);
    }

    static getArr(): Array<Label> {
        return [TagFilterConditionEnum.EXISTS, TagFilterConditionEnum.NOT_EXISTS, TagFilterConditionEnum.MUST_MATCH_VALUE, TagFilterConditionEnum.MUST_NOT_MATCH_VALUE, TagFilterConditionEnum.MUST_MATCH_VALUE_REGEX];
    }

    static getByValue(val:string): Label {
        return this.valMap.get(val) as Label;
    }
}
