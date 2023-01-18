import {createRouter, createWebHashHistory, createWebHistory, RouterHistory} from "vue-router";
import Routers from "./route";

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: getHistoryMode(),
    routes: Routers,
})

export default router

// 获取路由历史模式 https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
function getHistoryMode(): RouterHistory {
    const mode = "hash";
    if (mode === "hash") {
        return createWebHashHistory("");
    } else if (mode === "h5") {
        return createWebHistory("");
    }
}
