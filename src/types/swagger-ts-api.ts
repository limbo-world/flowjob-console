/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 请求响应封装 */
export interface ResponseDTOBoolean {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: boolean;
}

/** 作业分发配置参数 */
export interface DispatchOptionParam {
  /**
   * 负载方式
   * @format int32
   */
  loadBalanceType: number;
  /**
   * 所需的CPU核心数
   * 小于等于0表示此作业未定义CPU需求
   * @format float
   */
  cpuRequirement?: number;
  /**
   * 所需的内存MB数
   * 小于等于0表示此作业未定义内存需求
   * @format int64
   */
  ramRequirement?: number;
  /**
   * 标签过滤
   * 根据指定标签过滤
   */
  tagFilters?: TagFilterParam[];
}

/** 作业重试参数 */
export interface RetryOptionParam {
  /**
   * 重试次数
   * @format int32
   */
  retry?: number;
  /**
   * 重试间隔-秒
   * @format int32
   */
  retryInterval?: number;
  /**
   * 重试方式
   * @format int32
   */
  retryType?: number;
}

/** 作业调度配置参数 */
export interface ScheduleOptionParam {
  /**
   * 调度方式
   * @format int32
   */
  scheduleType: number;
  /**
   * 调度开始时间
   * @format date-time
   */
  scheduleStartAt?: string;
  /**
   * 调度结束时间
   * @format date-time
   */
  scheduleEndAt?: string;
  /**
   * 延迟时间
   * 延迟时间 -- 当前时间多久后调度
   * @format float
   */
  scheduleDelay?: number;
  /**
   * 调度间隔时间
   * 当调度方式为FIXED_DELAY时，表示前一次作业调度执行完成后，隔多久触发第二次调度。当调度方式为FIXED_RATE时，表示前一次作业调度下发后，隔多久触发第二次调度。
   * @format float
   */
  scheduleInterval?: number;
  /**
   * 作业调度的CRON表达式
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  scheduleCron?: string;
  /**
   * 作业调度的CRON表达式类型
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  scheduleCronType?: string;
}

/**
 * 标签过滤参数
 * 根据指定标签过滤
 */
export interface TagFilterParam {
  tagName?: string;
  tagValue?: string;
  condition?:
    | "UNKNOWN"
    | "EXISTS"
    | "NOT_EXISTS"
    | "MUST_MATCH_VALUE"
    | "MUST_NOT_MATCH_VALUE"
    | "MUST_MATCH_VALUE_REGEX"
    | "MATCH_HOST_PORT";
}

/** 作业参数 */
export interface WorkflowJobParam {
  /**
   * id
   * 视图中唯一
   */
  id: string;
  /** 作业名称 */
  name: string;
  /** 作业描述 */
  description?: string;
  /** 作业类型 */
  type: "UNKNOWN" | "STANDALONE" | "BROADCAST" | "MAP" | "MAP_REDUCE";
  /** 属性参数 */
  attributes?: Record<string, object>;
  retryOption?: RetryOptionParam;
  dispatchOption: DispatchOptionParam;
  /** 执行器名称 */
  executorName: string;
  /**
   * 此作业相连的下级作业名称
   * @uniqueItems true
   */
  children?: string[];
  /** 触发类型 */
  triggerType: "UNKNOWN" | "API" | "SCHEDULE";
  /**
   * 执行失败是否继续
   * true 会继续执行后续作业
   */
  continueWhenFail?: boolean;
}

/** DAG 任务更新参数 */
export interface WorkflowPlanUpdateParam {
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionParam;
  /** 工作流对应的所有作业 */
  workflow?: WorkflowJobParam[];
  /** 任务 ID */
  planId: string;
}

/** 请求响应封装 */
export interface ResponseDTOString {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: string;
}

/** 工作流任务参数 */
export interface WorkflowPlanParam {
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionParam;
  /** 工作流对应的所有作业 */
  workflow?: WorkflowJobParam[];
}

/**
 * worker 标签
 * worker 的标签
 */
export interface Tag {
  /** 标签 key */
  key?: string;
  /** 标签 value */
  value?: string;
}

/** 执行器 */
export interface WorkerExecutorRegisterParam {
  name?: string;
  description?: string;
}

/** worker 注册参数 */
export interface WorkerRegisterParam {
  /** 注册时指定的 worker 名称，唯一 */
  name?: string;
  /** worker 通信使用的 URL */
  url: string;
  /** worker 可用的资源 */
  availableResource?: WorkerResourceParam;
  /**
   * worker 的标签
   * @uniqueItems true
   */
  tags?: Tag[];
  /** 执行器 */
  executors: WorkerExecutorRegisterParam[];
  /** worker所属租户信息 */
  tenant?: WorkerTenantParam;
}

/**
 * worker节点的资源描述
 * worker 可用的资源
 */
export interface WorkerResourceParam {
  /**
   * 可用的CPU核心数。
   * @format float
   */
  availableCpu?: number;
  /**
   * 可用的内存空间，单位MB。
   * @format int64
   */
  availableRAM?: number;
  /**
   * 任务队列可排队数
   * @format int32
   */
  availableQueueLimit?: number;
}

/**
 * worker的租户信息参数
 * worker所属租户信息
 */
export interface WorkerTenantParam {
  /** 租户ID */
  tenantId?: string;
}

/**
 * broker节点描述
 * broker节点列表，主从模式下，列表中仅包括一个主节点
 */
export interface BrokerDTO {
  /** broker节点主机名 */
  host?: string;
  /**
   * broker节点服务端口
   * @format int32
   */
  port?: number;
}

/** broker 的拓扑结构 */
export interface BrokerTopologyDTO {
  /** broker节点列表，主从模式下，列表中仅包括一个主节点 */
  brokers?: BrokerDTO[];
}

/** 请求响应封装 */
export interface ResponseDTOWorkerRegisterDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: WorkerRegisterDTO;
}

/**
 * worker注册结果
 * 响应数据
 */
export interface WorkerRegisterDTO {
  /** workerId的字符串形式 */
  workerId?: string;
  /** broker 的拓扑结构 */
  brokerTopology?: BrokerTopologyDTO;
}

/** worker心跳参数 */
export interface WorkerHeartbeatParam {
  /** worker 可用的资源 */
  availableResource?: WorkerResourceParam;
}

export interface PlanScheduleParam {
  planId?: string;
  attributes?: Record<string, object>;
}

/** 请求响应封装 */
export interface ResponseDTOVoid {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: object;
}

export interface PlanJobScheduleParam {
  planInstanceId?: string;
  jobId?: string;
}

/** 作业执行反馈参数 */
export interface JobFeedbackParam {
  /** 执行结果，参考枚举 ExecuteResult */
  result: "UNKNOWN" | "SUCCEED" | "FAILED" | "TERMINATED";
  /** 执行失败时候返回的信息 */
  errorMsg?: string;
  /** 更新的作业上下文元数据 */
  context?: Record<string, object>;
}

/** agent 注册参数 */
export interface AgentRegisterParam {
  /** 通信使用的 URL */
  url: string;
  /** 可用资源 */
  availableResource?: AgentResourceParam;
}

/**
 * 节点的资源描述
 * 可用资源
 */
export interface AgentResourceParam {
  /**
   * 任务队列可排队数
   * @format int32
   */
  availableQueueLimit?: number;
}

/**
 * agent注册结果
 * 响应数据
 */
export interface AgentRegisterDTO {
  /** ID */
  agentId?: string;
  /** broker 的拓扑结构 */
  brokerTopology?: BrokerTopologyDTO;
}

/** 请求响应封装 */
export interface ResponseDTOAgentRegisterDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: AgentRegisterDTO;
}

/** Agent心跳参数 */
export interface AgentHeartbeatParam {
  /** 可用资源 */
  availableResource?: AgentResourceParam;
}

/** 普通任务参数 */
export interface NormalPlanParam {
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionParam;
  /** 作业类型 */
  type: "UNKNOWN" | "STANDALONE" | "BROADCAST" | "MAP" | "MAP_REDUCE";
  /** 属性参数 */
  attributes?: Record<string, object>;
  retryOption?: RetryOptionParam;
  dispatchOption: DispatchOptionParam;
  /** 执行器名称 */
  executorName: string;
}

export interface OrderParam {
  column?: string;
  sort?: string;
}

export interface PlanVersionParam {
  /**
   * @format int32
   * @min 1
   */
  current?: number;
  /**
   * @format int32
   * @max 1000
   */
  size?: number;
  orderBy?: string[];
  sort?: string[];
  searchCount?: boolean;
  planId?: string;
  orders?: OrderParam[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOPlanVersionDTO {
  /**
   * 页码
   * @format int32
   */
  current?: number;
  /**
   * 每页条数
   * @format int32
   */
  size?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
  /** 当前页数据 */
  data?: PlanVersionDTO[];
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/**
 * 任务对象
 * 当前页数据
 */
export interface PlanVersionDTO {
  /** ID */
  planInfoId?: string;
  /** 任务名称 */
  name?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createdAt?: string;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOPlanVersionDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOPlanVersionDTO;
}

/** 作业分发配置参数 */
export interface DispatchOptionDTO {
  /**
   * 负载方式
   * @format int32
   */
  loadBalanceType: number;
  /**
   * 所需的CPU核心数
   * 小于等于0表示此作业未定义CPU需求
   * @format float
   */
  cpuRequirement?: number;
  /**
   * 所需的内存MB数
   * 小于等于0表示此作业未定义内存需求
   * @format int64
   */
  ramRequirement?: number;
  /**
   * 标签过滤
   * 根据指定标签过滤
   */
  tagFilters?: TagFilterDTO[];
}

/** 请求响应封装 */
export interface ResponseDTOWorkflowPlanInfoDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: WorkflowPlanInfoDTO;
}

/** 作业重试参数 */
export interface RetryOptionDTO {
  /**
   * 重试次数
   * @format int32
   */
  retry?: number;
  /**
   * 重试间隔-秒
   * @format int32
   */
  retryInterval?: number;
  /**
   * 重试方式
   * @format int32
   */
  retryType?: number;
}

/** 作业调度配置参数 */
export interface ScheduleOptionDTO {
  /**
   * 调度方式
   * @format int32
   */
  scheduleType: number;
  /**
   * 调度开始时间
   * @format date-time
   */
  scheduleStartAt?: string;
  /**
   * 调度结束时间
   * @format date-time
   */
  scheduleEndAt?: string;
  /**
   * 延迟时间
   * 延迟时间 -- 当前时间多久后调度
   * @format float
   */
  scheduleDelay?: number;
  /**
   * 调度间隔时间
   * 当调度方式为FIXED_DELAY时，表示前一次作业调度执行完成后，隔多久触发第二次调度。当调度方式为FIXED_RATE时，表示前一次作业调度下发后，隔多久触发第二次调度。
   * @format float
   */
  scheduleInterval?: number;
  /**
   * 作业调度的CRON表达式
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  scheduleCron?: string;
  /**
   * 作业调度的CRON表达式类型
   * 当调度方式为CRON时，根据此CRON表达式计算得到的时间点触发作业调度。
   */
  scheduleCronType?: string;
}

/**
 * 标签过滤参数
 * 根据指定标签过滤
 */
export interface TagFilterDTO {
  tagName?: string;
  tagValue?: string;
  condition?:
    | "UNKNOWN"
    | "EXISTS"
    | "NOT_EXISTS"
    | "MUST_MATCH_VALUE"
    | "MUST_NOT_MATCH_VALUE"
    | "MUST_MATCH_VALUE_REGEX"
    | "MATCH_HOST_PORT";
}

/** 作业参数 */
export interface WorkflowJobDTO {
  /**
   * id
   * 视图中唯一
   */
  id: string;
  /** 作业名称 */
  name: string;
  /** 作业描述 */
  description?: string;
  /** 作业类型 */
  type: "UNKNOWN" | "STANDALONE" | "BROADCAST" | "MAP" | "MAP_REDUCE";
  /** 属性参数 */
  attributes?: Map<string, string>;
  retryOption?: RetryOptionDTO;
  dispatchOption: DispatchOptionDTO;
  /** 执行器名称 */
  executorName: string;
  /**
   * 此作业相连的下级作业名称
   * @uniqueItems true
   */
  children?: string[];
  /** 触发类型 */
  triggerType: "UNKNOWN" | "API" | "SCHEDULE";
  /**
   * 执行失败是否继续
   * true 会继续执行后续作业
   */
  continueWhenFail?: boolean;
}

/**
 * 工作流任务参数
 * 响应数据
 */
export interface WorkflowPlanInfoDTO {
  /** 任务ID */
  planInfoId?: string;
  /** 任务ID */
  planId?: string;
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionDTO;
  /** 工作流对应的所有作业 */
  workflow?: WorkflowJobDTO[];

  dagData: PlanDagData;
}

export interface PlanDagData {
  nodes: Map<string, PlanDagNodeData>
  // edges: Map<string, object>
}

export interface PlanDagNodeData {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WorkerQueryParam {
  /**
   * @format int32
   * @min 1
   */
  current?: number;
  /**
   * @format int32
   * @max 1000
   */
  size?: number;
  orderBy?: string[];
  sort?: string[];
  searchCount?: boolean;
  name?: string;
  orders?: OrderParam[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOWorkerDTO {
  /**
   * 页码
   * @format int32
   */
  current?: number;
  /**
   * 每页条数
   * @format int32
   */
  size?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
  /** 当前页数据 */
  data?: WorkerDTO[];
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOWorkerDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOWorkerDTO;
}

/**
 * Worker
 * 当前页数据
 */
export interface WorkerDTO {
  /** id */
  workerId?: string;
  /** 名称 */
  name?: string;
  /** 通信协议 */
  protocol?: string;
  /** host */
  host?: string;
  /**
   * port
   * @format int32
   */
  port?: number;
  /** @format float */
  availableCpu?: number;
  /** @format int64 */
  availableRam?: number;
  /** @format int32 */
  availableQueueLimit?: number;
  /** tag */
  tags?: WorkerTagDTO[];
  /**
   * 节点状态
   * @format int32
   */
  status?: number;
  /** 是否启用 */
  enabled?: boolean;
}

/** worker 标签 */
export interface WorkerTagDTO {
  /** 标签 key */
  key?: string;
  /** 标签 value */
  value?: string;
}

export interface TaskQueryParam {
  /**
   * @format int32
   * @min 1
   */
  current?: number;
  /**
   * @format int32
   * @max 1000
   */
  size?: number;
  orderBy?: string[];
  sort?: string[];
  searchCount?: boolean;
  jobInstanceId: string;
  orders?: OrderParam[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOTaskDTO {
  /**
   * 页码
   * @format int32
   */
  current?: number;
  /**
   * 每页条数
   * @format int32
   */
  size?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
  /** 当前页数据 */
  data?: TaskDTO[];
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOTaskDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOTaskDTO;
}

/**
 * 任务实例
 * 当前页数据
 */
export interface TaskDTO {
  /** id */
  taskId?: string;
  jobInstanceId?: string;
  /** 执行作业的worker */
  workerId?: string;
  workerAddress?: string;
  /**
   * 类型
   * @format int32
   */
  type?: number;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /** 执行上下文 */
  context?: string;
  /** 配置参数 */
  jobAttributes?: string;
  /** task参数 */
  taskAttributes?: string;
  /** 结果 */
  result?: string;
  /** 异常信息 */
  errorMsg?: string;
  /** 异常堆栈 */
  errorStackTrace?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startAt?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endAt?: string;
}

/** 响应数据 */
export interface AvailableWorkerDTO {
  /** ID */
  id?: string;
  /** 通信协议 */
  protocol?: string;
  /** 节点主机名 */
  host?: string;
  /**
   * 节点服务端口
   * @format int32
   */
  port?: number;
}

/** 请求响应封装 */
export interface ResponseDTOListAvailableWorkerDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: AvailableWorkerDTO[];
}

export interface PlanQueryParam {
  /**
   * @format int32
   * @min 1
   */
  current?: number;
  /**
   * @format int32
   * @max 1000
   */
  size?: number;
  orderBy?: string[];
  sort?: string[];
  searchCount?: boolean;
  name?: string;
  orders?: OrderParam[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOPlanDTO {
  /**
   * 页码
   * @format int32
   */
  current?: number;
  /**
   * 每页条数
   * @format int32
   */
  size?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
  /** 当前页数据 */
  data?: PlanDTO[];
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/**
 * 任务对象
 * 当前页数据
 */
export interface PlanDTO {
  /** id */
  planId?: string;
  /** 当前版本 */
  currentVersion?: string;
  /** 最新版本 */
  recentlyVersion?: string;
  /** 是否启动 */
  enabled?: boolean;
  /** 名称 */
  name?: string;
  /** 描述 */
  description?: string;
  /**
   * 任务类型
   * @format int32
   */
  planType?: number;
  /**
   * 调度方式
   * @format int32
   */
  scheduleType?: number;
  /**
   * 触发方式
   * @format int32
   */
  triggerType?: number;
  /**
   * 调度开始时间
   * @format date-time
   */
  scheduleStartAt?: string;
  /**
   * 调度结束时间
   * @format date-time
   */
  scheduleEndAt?: string;
  /**
   * 调度延迟时间
   * @format int64
   */
  scheduleDelay?: number;
  /**
   * 调度间隔时间
   * @format int64
   */
  scheduleInterval?: number;
  /** CRON表达式 */
  scheduleCron?: string;
  /** CRON表达式类型 */
  scheduleCronType?: string;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOPlanDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOPlanDTO;
}

/**
 * 普通任务参数
 * 响应数据
 */
export interface NormalPlanInfoDTO {
  /** 任务ID */
  planInfoId?: string;
  /** 任务ID */
  planId?: string;
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionDTO;
  /** 作业类型 */
  type: "UNKNOWN" | "STANDALONE" | "BROADCAST" | "MAP" | "MAP_REDUCE";
  /** 属性参数 */
  attributes: Map<string, string>;
  retryOption?: RetryOptionDTO;
  dispatchOption: DispatchOptionDTO;
  /** 执行器名称 */
  executorName: string;
}

/** 请求响应封装 */
export interface ResponseDTONormalPlanInfoDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: NormalPlanInfoDTO;
}

export interface PlanInstanceQueryParam {
  /**
   * @format int32
   * @min 1
   */
  current?: number;
  /**
   * @format int32
   * @max 1000
   */
  size?: number;
  orderBy?: string[];
  sort?: string[];
  searchCount?: boolean;
  planId?: string;
  triggerAtBegin?: string;
  triggerAtEnd?: string;
  orders?: OrderParam[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOPlanInstanceDTO {
  /**
   * 页码
   * @format int32
   */
  current?: number;
  /**
   * 每页条数
   * @format int32
   */
  size?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
  /** 当前页数据 */
  data?: PlanInstanceDTO[];
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/**
 * 任务对象
 * 当前页数据
 */
export interface PlanInstanceDTO {
  /** id */
  planInstanceId?: string;
  /** planId */
  planId?: string;
  /** 版本id */
  planInfoId?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 触发类型
   * @format int32
   */
  triggerType?: number;
  /**
   * 计划作业调度方式
   * @format int32
   */
  scheduleType?: number;
  /**
   * 期望的调度触发时间
   * @format date-time
   */
  triggerAt?: string;
  /**
   * 执行开始时间
   * @format date-time
   */
  startAt?: string;
  /**
   * 执行结束时间
   * @format date-time
   */
  feedbackAt?: string;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOPlanInstanceDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOPlanInstanceDTO;
}

export interface JobInstanceQueryParam {
  /**
   * @format int32
   * @min 1
   */
  current?: number;
  /**
   * @format int32
   * @max 1000
   */
  size?: number;
  orderBy?: string[];
  sort?: string[];
  searchCount?: boolean;
  planInstanceId?: string;
  orders?: OrderParam[];
  /** @format int32 */
  offset?: number;
}

/**
 * 任务实例
 * 当前页数据
 */
export interface JobInstanceDTO {
  /** id */
  jobInstanceId?: string;
  planInstanceId?: string;
  planId?: string;
  planInfoId?: string;
  /** DAG中的jobId */
  jobId?: string;
  /**
   * 状态
   * @format int32
   */
  status?: number;
  /**
   * 重试次数
   * @format int32
   */
  retryTimes?: number;
  /** 错误信息 */
  errorMsg?: string;
  /** 上下文 */
  context?: string;
  /**
   * 计划时间
   * @format date-time
   */
  triggerAt?: string;
  /**
   * 开始时间
   * @format date-time
   */
  startAt?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endAt?: string;
}

/** 响应数据 */
export interface PageDTOJobInstanceDTO {
  /**
   * 页码
   * @format int32
   */
  current?: number;
  /**
   * 每页条数
   * @format int32
   */
  size?: number;
  /**
   * 总条数
   * @format int64
   */
  total?: number;
  /** 当前页数据 */
  data?: JobInstanceDTO[];
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOJobInstanceDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOJobInstanceDTO;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8081";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8081
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags plan console api
     * @name VersionUpdate
     * @summary 更新工作量 plan 的生效版本
     * @request POST:/api/v1/workflow-plan/version
     */
    versionUpdate: (
      query: {
        planId: string;
        version: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/workflow-plan/version`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Update
     * @summary 更新工作流计划
     * @request POST:/api/v1/workflow-plan/update
     */
    update: (data: WorkflowPlanUpdateParam, params: RequestParams = {}) =>
      this.request<ResponseDTOString, any>({
        path: `/api/v1/workflow-plan/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Add
     * @summary 新增工作流计划
     * @request POST:/api/v1/workflow-plan/add
     */
    add: (data: WorkflowPlanParam, params: RequestParams = {}) =>
      this.request<ResponseDTOString, any>({
        path: `/api/v1/workflow-plan/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker console api
     * @name Stop
     * @summary 停止worker
     * @request POST:/api/v1/worker/stop
     */
    stop: (
      query: {
        workerId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/worker/stop`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker console api
     * @name Start
     * @summary 启动worker
     * @request POST:/api/v1/worker/start
     */
    start: (
      query: {
        workerId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/worker/start`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker remote rpc
     * @name Register
     * @summary worker注册
     * @request POST:/api/v1/rpc/worker
     */
    register: (data: WorkerRegisterParam, params: RequestParams = {}) =>
      this.request<ResponseDTOWorkerRegisterDTO, any>({
        path: `/api/v1/rpc/worker`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker remote rpc
     * @name Heartbeat
     * @summary worker心跳
     * @request POST:/api/v1/rpc/worker/heartbeat
     */
    heartbeat: (
      query: {
        id: string;
      },
      data: WorkerHeartbeatParam,
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOWorkerRegisterDTO, any>({
        path: `/api/v1/rpc/worker/heartbeat`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan remote rpc
     * @name SchedulePlan
     * @summary 触发对应plan调度
     * @request POST:/api/v1/rpc/plan/schedule
     */
    schedulePlan: (data: PlanScheduleParam, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/v1/rpc/plan/schedule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan remote rpc
     * @name ScheduleJob
     * @summary 触发对应job调度
     * @request POST:/api/v1/rpc/plan-instance/job/schedule
     */
    scheduleJob: (data: PlanJobScheduleParam, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/v1/rpc/plan-instance/job/schedule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags job remote rpc
     * @name Report
     * @summary job执行上报
     * @request POST:/api/v1/rpc/job/report
     */
    report: (
      query: {
        jobInstanceId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/rpc/job/report`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags job remote rpc
     * @name Feedback
     * @summary 任务执行反馈接口
     * @request POST:/api/v1/rpc/job/feedback
     */
    feedback: (
      query: {
        jobInstanceId: string;
      },
      data: JobFeedbackParam,
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/rpc/job/feedback`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags job remote rpc
     * @name Executing
     * @summary job开始执行反馈
     * @request POST:/api/v1/rpc/job/executing
     */
    executing: (
      query: {
        agentId: string;
        jobInstanceId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/rpc/job/executing`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent remote rpc
     * @name Register1
     * @summary 注册
     * @request POST:/api/v1/rpc/agent
     */
    register1: (data: AgentRegisterParam, params: RequestParams = {}) =>
      this.request<ResponseDTOAgentRegisterDTO, any>({
        path: `/api/v1/rpc/agent`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags agent remote rpc
     * @name Heartbeat1
     * @summary 心跳
     * @request POST:/api/v1/rpc/agent/heartbeat
     */
    heartbeat1: (
      query: {
        id: string;
      },
      data: AgentHeartbeatParam,
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOAgentRegisterDTO, any>({
        path: `/api/v1/rpc/agent/heartbeat`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name VersionUpdate1
     * @summary 版本修改
     * @request POST:/api/v1/plan/version
     */
    versionUpdate1: (
      query: {
        planId: string;
        version: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/plan/version`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Update1
     * @summary 修改计划
     * @request POST:/api/v1/plan/update
     */
    update1: (planId: string, data: NormalPlanParam, params: RequestParams = {}) =>
      this.request<ResponseDTOString, any>({
        path: `/api/v1/plan/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Stop1
     * @summary 停止计划
     * @request POST:/api/v1/plan/stop
     */
    stop1: (
      query: {
        planId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/plan/stop`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Start1
     * @summary 启动计划
     * @request POST:/api/v1/plan/start
     */
    start1: (
      query: {
        planId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/plan/start`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name SchedulePlan1
     * @summary 触发对应plan调度
     * @request POST:/api/v1/plan/schedule
     */
    schedulePlan1: (data: PlanScheduleParam, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/v1/plan/schedule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Add1
     * @summary 新增计划
     * @request POST:/api/v1/plan/add
     */
    add1: (data: NormalPlanParam, params: RequestParams = {}) =>
      this.request<ResponseDTOString, any>({
        path: `/api/v1/plan/add`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan instance console api
     * @name ScheduleJob1
     * @summary 触发对应job调度
     * @request POST:/api/v1/plan-instance/job/schedule
     */
    scheduleJob1: (
      query: {
        planInstanceId: string;
        jobId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/v1/plan-instance/job/schedule`,
        method: "POST",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name VersionPage
     * @summary 获取工作流 plan 版本列表
     * @request GET:/api/v1/workflow-plan/version/page
     */
    versionPage: (
      query: {
        param: PlanVersionParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOPlanVersionDTO, any>({
        path: `/api/v1/workflow-plan/version/page`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Get
     * @summary 详情
     * @request GET:/api/v1/workflow-plan/get
     */
    get: (
      query: {
        planId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOWorkflowPlanInfoDTO, any>({
        path: `/api/v1/workflow-plan/get`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker console api
     * @name Page
     * @summary worker list
     * @request GET:/api/v1/worker
     */
    page: (
      query: {
        param: WorkerQueryParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOWorkerDTO, any>({
        path: `/api/v1/worker`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags task console api
     * @name Page1
     * @summary 任务列表
     * @request GET:/api/v1/task/page
     */
    page1: (
      query: {
        param: TaskQueryParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOTaskDTO, any>({
        path: `/api/v1/task/page`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags job remote rpc
     * @name JobFilterWorkers
     * @summary 任务可执行worker
     * @request GET:/api/v1/rpc/job/worker
     */
    jobFilterWorkers: (
      query: {
        jobInstanceId: string;
        filterExecutor?: boolean;
        filterTag?: boolean;
        filterResource?: boolean;
        lbSelect?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOListAvailableWorkerDTO, any>({
        path: `/api/v1/rpc/job/worker`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name VersionPage1
     * @summary 版本列表
     * @request GET:/api/v1/plan/version/page
     */
    versionPage1: (
      query: {
        param: PlanVersionParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOPlanVersionDTO, any>({
        path: `/api/v1/plan/version/page`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Page2
     * @summary 计划列表
     * @request GET:/api/v1/plan/page
     */
    page2: (
      query: {
        param: PlanQueryParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOPlanDTO, any>({
        path: `/api/v1/plan/page`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Get1
     * @summary 详情
     * @request GET:/api/v1/plan/get
     */
    get1: (
      query: {
        planId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTONormalPlanInfoDTO, any>({
        path: `/api/v1/plan/get`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan instance console api
     * @name Page3
     * @summary 计划列表
     * @request GET:/api/v1/plan-instance/page
     */
    page3: (
      query: {
        param: PlanInstanceQueryParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOPlanInstanceDTO, any>({
        path: `/api/v1/plan-instance/page`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags job instance console api
     * @name Page4
     * @summary 计划列表
     * @request GET:/api/v1/job-instance/page
     */
    page4: (
      query: {
        param: JobInstanceQueryParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOJobInstanceDTO, any>({
        path: `/api/v1/job-instance/page`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
