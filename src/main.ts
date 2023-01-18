import { createApp } from 'vue'
import App from './App.vue'
import router from "@/libs/router";
import { i18n } from "@/libs/i18n";
import ElementPlus from "element-plus";

// 样式
import "element-plus/dist/index.css";
import './style.scss';

const app = createApp(App)

app.use(ElementPlus)
app.use(i18n)
app.use(router)
app.mount('#app')
