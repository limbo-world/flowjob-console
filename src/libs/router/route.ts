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
                path: '/plan/instance/list',
                component: () => import("@/views/plan/PLanInstanceList.vue"),
            },
            {
                path: '/plan/workflow/detail',
                component: () => import("@/views/plan/WorkflowDetail.vue"),
            },
            {
                path: '/worker/list',
                component: () => import("@/views/worker/WorkerList.vue"),
            },
            {
                path: '/test/workflow',
                component: () => import("@/views/plan/WorkflowDetail.vue"),
            },
        ]
    }
] as Array<RouteRecordRaw>;
