<template>
    <el-container>
        <el-header class="padding-top-xs" height="50px">
            <el-form ref="searchForm" :inline="true">
                <el-form-item label="名称">
                    <el-input v-model="planQueryForm.name" placeholder="输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loadPlans" :icon="Search">查询</el-button>
                    <el-button type="primary" @click="() => toPlanInfo('', PlanTypeEnum.STANDALONE.value, true)"
                        :icon="CirclePlus">新增普通任务</el-button>
                    <el-button type="primary" @click="() => toPlanInfo('', PlanTypeEnum.WORKFLOW.value, true)"
                        :icon="CirclePlus">新增工作流任务</el-button>
                </el-form-item>
            </el-form>
        </el-header>

        <el-main>
            <el-table :data="plans">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column label="类型" align="center" width="100">
                    <template #default="scope">
                        {{ PlanTypeEnum.getByValue(scope.row.planType).label }}
                    </template>
                </el-table-column>
                <el-table-column label="调度方式" align="center" width="120">
                    <template #default="scope">
                        {{ ScheduleTypeEnum.getByValue(scope.row.scheduleType).label }}
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" align="center" width="100">
                    <template #default="scope">
                        <el-switch v-model="scope.row.enabled" @change="v => changeEnable(scope.row.planId, v)"
                            active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button link type="primary"
                            @click="toPlanInfo(scope.row.planId, scope.row.planType, false)">查看</el-button>
                        <el-button link type="primary"
                            @click="toPlanInfo(scope.row.planId, scope.row.planType, true)">编辑</el-button>
                        <el-button link type="primary" @click="schedulePlan(scope.row.planId)">运行</el-button>
                        <el-button link type="primary" @click="toPlanInstanceList(scope.row.planId)">记录</el-button>
                        <el-button link type="primary" @click="() => loadVersions(scope.row)">版本</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-footer>
            <el-pagination background layout="total, prev, pager, next" :total="planQueryForm.total"
                :current-page="planQueryForm.current" :page-size="planQueryForm.size" @current-change="handleCurrentChange">
            </el-pagination>
        </el-footer>
        
        <el-drawer v-model="versionVisible" size="60%" title="版本列表" class="version-drawer">
            <el-table :data="versions" style="width: 100%" row-key="id" border>
                <el-table-column prop="planInfoId" label="版本号" />
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="createdAt" label="创建时间"></el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="scope">
                        <el-tag :type="currentPlan.planInfoId === scope.row.planInfoId ? 'success': 'info'">
                            {{ currentPlan.planInfoId === scope.row.planInfoId ? "生效中" : "未生效" }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button link type="primary" @click="() => effectVersion(scope.row.planInfoId)">生效</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="total, prev, pager, next" :total="versionQueryForm.total"
                :current-page="versionQueryForm.current" :page-size="versionQueryForm.size"
                @current-change="versionPageChange">
            </el-pagination>
        </el-drawer>

    </el-container>
</template>

<script setup lang="ts">
import { CirclePlus, Search } from '@element-plus/icons-vue'
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import { PlanTypeEnum, ScheduleTypeEnum } from '@/types/console-enums';
import { ElMessage } from "element-plus";
import { PlanDTO } from '@/types/swagger-ts-api';

const { proxy }: any = getCurrentInstance();

let router = useRouter();

const planQueryForm = reactive({
    name: '',
    current: 1,
    size: 10,
    total: 0
})

const versionQueryForm = reactive({
    planId: '',
    current: 1,
    size: 10,
    total: 0
})

const plans = ref<PlanDTO[]>([])
const versionVisible = ref(false);
const versions = ref([])
const currentPlan = ref();

onMounted(() => {
    loadPlans();
});


/**
 * 加载任务列表
 */
function loadPlans() {
    const queryParam = { params: planQueryForm };
    proxy.$request.get(`/api/v1/plan/page`, queryParam)
        .then((response: any) => {
            let page = response.data
            plans.value = page.data;
            planQueryForm.total = page.total;
        });
}


/**
 * 加载任务的版本列表
 */
async function loadVersions(plan: PlanDTO) {
    // 获取 plan 信息，主要是为了获取 planInfoId，判断生效的版本 ID
    console.log(plan);
    let uri = PlanTypeEnum.STANDALONE.value === plan.planType 
                    ? '/api/v1/plan/get' : '/api/v1/workflow-plan/get';
    let response = await proxy.$request.get(`${uri}?planId=${plan.planId}`);
    currentPlan.value = plan;
    currentPlan.value.planInfoId = response.data.planInfoId;

    // 版本列表
    versionQueryForm.planId = plan.planId;
    uri = PlanTypeEnum.STANDALONE.value === plan.planType 
                    ? '/api/v1/plan/version/page' : '/api/v1/workflow-plan/version/page';
    response = await proxy.$request.get(`/api/v1/plan/version/page`, { params: versionQueryForm });
    versions.value = response.data.data;
    versionQueryForm.total = response.data.total;
    versionVisible.value = true;
}


/**
 * 任务回滚到某个版本
 * @param version 版本号
 */
async function effectVersion(version: string) {
    await proxy.$request.post(`/api/v1/plan/version?planId=${versionQueryForm.planId}&version=${version}`);
    // 重新加载版本列表
    loadVersions(currentPlan.value);
}


const handleCurrentChange = (val: any) => {
    planQueryForm.current = val;
    loadPlans();
}

const versionPageChange = (val: any) => {
    versionQueryForm.current = val;
    loadVersions(currentPlan.value);
}

// 切换开关
function changeEnable(planId: any, enable: any) {
    if (enable) {
        proxy.$request.post(`/api/v1/plan/start?planId=${planId}`).then((response: any) => {
            loadPlans();
        })
    } else {
        proxy.$request.post(`/api/v1/plan/stop?planId=${planId}`).then((response: any) => {
            loadPlans();
        })
    }
}

// 跳转到详情
const toPlanInfo = (planId: string, planType: number, edit: any) => {
    if (PlanTypeEnum.STANDALONE.value === planType) {
        router.push({
            path: '/standalone-plan/edit',
            query: { planId: planId, edit: edit }
        })
    } else if (PlanTypeEnum.WORKFLOW.value === planType) {
        router.push({
            path: '/workflow-plan/edit',
            query: { planId: planId, readonly: edit ? 0 : 1 }
        })
    }
}

const schedulePlan = (planId: string) => {
    proxy.$request.post(`/api/v1/plan/schedule?planId=${planId}`).then((response: any) => {
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



const toPlanInstanceList = (planId: string) => {
    router.push({
        path: '/plan/instance/list',
        query: { planId: planId }
    })
}

</script>

<style lang="scss">
.el-table {
    .operations {
        .el-button {
            font-size: 10px;
        }
    }
}

.version-drawer {
    .el-drawer__header {
        margin-bottom: 0;
    }
    .el-pagination {
        margin-top: 20px;
    }
}
</style>
