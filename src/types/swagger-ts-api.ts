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
   */
  cpuRequirement?: number;
  /**
   * 所需的内存GB数
   * 小于等于0表示此作业未定义内存需求
   */
  ramRequirement?: number;
  /**
   * 标签过滤
   * 根据指定标签过滤
   */
  tagFilters?: TagFilterParam[];
}

/** 作业参数 */
export interface JobParam {
  /**
   * 作业类型
   * @format int32
   */
  type: number;
  /** 属性参数 */
  attributes?: Record<string, object>;
  retryOption?: RetryOptionParam;
  dispatchOption: DispatchOptionParam;
  /** 执行器名称 */
  executorName: string;
}

/** 任务参数 */
export interface PlanParam {
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 任务类型
   * @format int32
   */
  planType: number;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionParam;
  job?: JobParam;
  /** 工作流对应的所有作业 */
  workflow?: WorkflowJobParam[];
  currentVersion?: string;
  recentlyVersion?: string;
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
  /** @format int32 */
  condition?: number;
}

/** 作业参数 */
export interface WorkflowJobParam {
  /**
   * 作业类型
   * @format int32
   */
  type: number;
  /** 属性参数 */
  attributes?: Record<string, object>;
  retryOption?: RetryOptionParam;
  dispatchOption: DispatchOptionParam;
  /** 执行器名称 */
  executorName: string;
  /**
   * id
   * 视图中唯一
   */
  id: string;
  /** 作业名称 */
  name: string;
  /** 作业描述 */
  description?: string;
  /**
   * 此作业相连的下级作业名称
   * @uniqueItems true
   */
  children?: string[];
  /**
   * 触发类型
   * @format int32
   */
  triggerType: number;
  /**
   * 执行失败是否继续
   * true 会继续执行后续作业
   */
  continueWhenFail?: boolean;
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
   * 可用的内存空间，单位GB。
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

/** 作业执行反馈参数 */
export interface TaskFeedbackParam {
  /**
   * 执行结果，参考枚举 ExecuteResult
   * @format int32
   */
  result: number;
  /** 执行失败时候返回的信息 */
  errorMsg?: string;
  /** 执行失败时的异常堆栈 */
  errorStackTrace?: string;
  /** 更新的作业上下文元数据 */
  context?: Record<string, object>;
  /** 更新后的节点参数 */
  jobAttributes?: Record<string, object>;
  /** 返回的数据 */
  resultData?: object;
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

export interface OrderItem {
  column?: string;
  sort?: string;
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
  needAll?: boolean;
  searchCount?: boolean;
  name?: string;
  orders?: OrderItem[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOWorkerVO {
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
  data?: WorkerVO[];
  /** 是否查询所有数据 */
  needAll?: boolean;
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOWorkerVO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOWorkerVO;
}

/**
 * Worker
 * 当前页数据
 */
export interface WorkerVO {
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
  /**
   * 节点状态
   * @format int32
   */
  status?: number;
  /** 是否启用 */
  enabled?: boolean;
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
  needAll?: boolean;
  searchCount?: boolean;
  name?: string;
  orders?: OrderItem[];
  /** @format int32 */
  offset?: number;
}

/** 响应数据 */
export interface PageDTOPlanVO {
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
  data?: PlanVO[];
  /** 是否查询所有数据 */
  needAll?: boolean;
  /** 是否还有下一页 */
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
}

/**
 * 任务对象
 * 当前页数据
 */
export interface PlanVO {
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
  /**
   * 重试次数
   * @format int32
   */
  retry?: number;
}

/** 请求响应封装 */
export interface ResponseDTOPageDTOPlanVO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PageDTOPlanVO;
}

/** 作业分发配置数据模型 */
export interface DispatchOptionDTO {
  /**
   * 负载方式
   * @format int32
   */
  loadBalanceType: number;
  /**
   * 所需的CPU核心数
   * 小于等于0表示此作业未定义CPU需求
   */
  cpuRequirement?: number;
  /**
   * 所需的内存GB数
   * 小于等于0表示此作业未定义内存需求
   */
  ramRequirement?: number;
  /**
   * 标签过滤
   * 根据指定标签过滤
   */
  tagFilters?: TagFilterDTO[];
}

/** 作业数据模型 */
export interface JobDTO {
  /**
   * 作业类型
   * @format int32
   */
  type: number;
  /** 属性参数 */
  attributes?: Record<string, object>;
  retryOption?: RetryOptionDTO;
  dispatchOption: DispatchOptionDTO;
  /** 执行器名称 */
  executorName: string;
}

/**
 * 任务数据模型
 * 响应数据
 */
export interface PlanDTO {
  /** id */
  planId?: string;
  /** 任务名称 */
  name?: string;
  /** 任务描述 */
  description?: string;
  /**
   * 任务类型
   * @format int32
   */
  planType: number;
  /**
   * 触发方式
   * @format int32
   */
  triggerType: number;
  scheduleOption: ScheduleOptionDTO;
  job?: JobDTO;
  /** 工作流对应的所有作业 */
  workflow?: WorkflowJobDTO[];
  currentVersion?: string;
  recentlyVersion?: string;
}

/** 请求响应封装 */
export interface ResponseDTOPlanDTO {
  /**
   * 响应状态码
   * @format int32
   */
  code?: number;
  /** 错误提示信息，可选项 */
  message?: string;
  /** 响应数据 */
  data?: PlanDTO;
}

/** 作业重试策略数据模型 */
export type RetryOptionDTO = object;

/** 任务调度参数数据模型 */
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
 * 作业分发标签过滤器配置
 * 根据指定标签过滤
 */
export interface TagFilterDTO {
  /** 标签名 */
  tagName: string;
  /** 标签值 */
  tagValue: string;
  /**
   * 标签匹配方式
   * @format int32
   */
  condition: number;
}

/** 工作流作业数据模型 */
export interface WorkflowJobDTO {
  /**
   * 作业类型
   * @format int32
   */
  type: number;
  /** 属性参数 */
  attributes?: Record<string, object>;
  retryOption?: RetryOptionDTO;
  dispatchOption: DispatchOptionDTO;
  /** 执行器名称 */
  executorName: string;
  /**
   * id
   * 视图中唯一
   */
  id: string;
  /** 作业名称 */
  name: string;
  /** 作业描述 */
  description?: string;
  /**
   * 此作业相连的下级作业名称
   * @uniqueItems true
   */
  children?: string[];
  /**
   * 触发类型
   * @format int32
   */
  triggerType: number;
  /**
   * 执行失败是否继续
   * true 会继续执行后续作业
   */
  continueWhenFail?: boolean;
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
     * @name Replace
     * @summary 修改计划
     * @request PUT:/api/v1/plan/{planId}
     */
    replace: (planId: string, data: PlanParam, params: RequestParams = {}) =>
      this.request<ResponseDTOString, any>({
        path: `/api/v1/plan/${planId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Stop
     * @summary 停止计划
     * @request PUT:/api/v1/plan/{planId}/stop
     */
    stop: (planId: string, params: RequestParams = {}) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/plan/${planId}/stop`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Start
     * @summary 启动计划
     * @request PUT:/api/v1/plan/{planId}/start
     */
    start: (planId: string, params: RequestParams = {}) =>
      this.request<ResponseDTOBoolean, any>({
        path: `/api/v1/plan/${planId}/start`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Page1
     * @summary 计划列表
     * @request GET:/api/v1/plan
     */
    page1: (
      query: {
        param: PlanQueryParam;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPageDTOPlanVO, any>({
        path: `/api/v1/plan`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Add
     * @summary 新增计划
     * @request POST:/api/v1/plan
     */
    add: (data: PlanParam, params: RequestParams = {}) =>
      this.request<ResponseDTOString, any>({
        path: `/api/v1/plan`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker remote rpc
     * @name Register
     * @summary worker注册
     * @request POST:/api/rpc/v1/worker
     */
    register: (data: WorkerRegisterParam, params: RequestParams = {}) =>
      this.request<ResponseDTOWorkerRegisterDTO, any>({
        path: `/api/rpc/v1/worker`,
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
     * @request POST:/api/rpc/v1/worker/{workerId}/heartbeat
     */
    heartbeat: (workerId: string, data: WorkerHeartbeatParam, params: RequestParams = {}) =>
      this.request<ResponseDTOWorkerRegisterDTO, any>({
        path: `/api/rpc/v1/worker/${workerId}/heartbeat`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker remote rpc
     * @name Feedback
     * @summary 任务执行反馈接口
     * @request POST:/api/rpc/v1/worker/task/{taskId}/feedback
     */
    feedback: (taskId: string, data: TaskFeedbackParam, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/rpc/v1/worker/task/${taskId}/feedback`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker remote rpc
     * @name ScheduleJob
     * @summary 触发对应plan调度
     * @request POST:/api/rpc/v1/worker/plan/{planId}/schedule
     */
    scheduleJob: (planId: string, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/rpc/v1/worker/plan/${planId}/schedule`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags worker remote rpc
     * @name ScheduleJob1
     * @summary 触发对应job调度
     * @request POST:/api/rpc/v1/worker/plan-instance/{planInstanceId}/job/{jobId}/schedule
     */
    scheduleJob1: (planInstanceId: string, jobId: string, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/rpc/v1/worker/plan-instance/${planInstanceId}/job/${jobId}/schedule`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan instance console api
     * @name ScheduleJob2
     * @summary 触发对应job调度
     * @request POST:/api/rpc/v1/worker/plan-instance/{planInstanceId}/job/{jobId}/retry
     */
    scheduleJob2: (planInstanceId: string, jobId: string, params: RequestParams = {}) =>
      this.request<ResponseDTOVoid, any>({
        path: `/api/rpc/v1/worker/plan-instance/${planInstanceId}/job/${jobId}/retry`,
        method: "POST",
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
      this.request<ResponseDTOPageDTOWorkerVO, any>({
        path: `/api/v1/worker`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags plan console api
     * @name Get
     * @summary 获取单个计划详情
     * @request GET:/api/v1/plan/get
     */
    get: (
      query: {
        planId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResponseDTOPlanDTO, any>({
        path: `/api/v1/plan/get`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
}
