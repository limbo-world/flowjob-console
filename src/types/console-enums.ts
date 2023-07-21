
export class PlanType {

    /**
     * 未知
     */
    public static UNKNOWN: number = 0;

    /**
     * 普通任务
     */
    public static NORMAL: number = 1;

    /**
     * 工作流任务
     */
    public static WORKFLOW: number = 2;

}


export class JobType {
    public static UNKNOWN: number = 0;
    public static NORMAL: number = 1;
    public static BROADCAST: number = 2;
    public static MAP: number = 3;
    public static MAP_REDUCE: number = 4;
}


export class LoadBalanceType {
    public static UNKNOWN: number = 0;
    public static RANDOM: number = 1;
    public static ROUND_ROBIN: number = 2;
    public static APPOINT: number = 3;
    public static LEAST_FREQUENTLY_USED: number = 4;
    public static LEAST_RECENTLY_USED: number = 5;
    public static CONSISTENT_HASH: number = 6;
}


export class TriggerType {
    public static UNKNOWN: number = 0;
    public static API: number = 1;
    public static SCHEDULE: number = 2;
}
