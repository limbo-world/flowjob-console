import {createApp} from 'vue'
import App from './App.vue'
import router from "@/libs/router";
import {i18n} from "@/libs/i18n";
import ElementPlus from "element-plus";
import {menuIconPlugin} from "@/libs/router/icon";
import {axiosPlugin} from '@/libs/axios';

// 样式
import "element-plus/dist/index.css";
import '@/style.scss';

const app = createApp(App)

app.use(ElementPlus)
    .use(i18n)
    .use(router)
    .use(menuIconPlugin)
    .use(axiosPlugin)
    .mount('#app')
