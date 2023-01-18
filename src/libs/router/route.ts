import {RouteRecordRaw} from "vue-router";

export default [
    {
        path: '/',
        redirect: '/home',
        component: () => import("@/views/layout/Layout.vue"),
        children: [{
            path: '/home',
            component: () => import("@/views/home/Home.vue"),
        }]
    }
] as Array<RouteRecordRaw>;
