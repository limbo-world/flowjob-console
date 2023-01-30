import {RouteRecordRaw} from "vue-router";

export default [
    {
        path: '/',
        redirect: '/home',
        component: () => import("@/views/layout/Layout.vue"),
        children: [
            {
                path: '/home',
                component: () => import("@/views/home/Home.vue"),
            },
            {
                path: '/plan/list',
                component: () => import("@/views/plan/PlanList.vue"),
            },
            {
                path: '/plan/execute-record',
                component: () => import("@/views/plan/PLanExecuteRecord.vue"),
            },
            {
                path: '/worker/list',
                component: () => import("@/views/worker/WorkerList.vue"),
            },
        ]
    }
] as Array<RouteRecordRaw>;
