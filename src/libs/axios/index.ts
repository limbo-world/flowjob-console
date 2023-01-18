import axios from 'axios'
import {App} from "vue";

const request = axios.create({
    baseURL: process.env.VUE_APP_baseUrl, // api的base_url 配置后，请求会拼接对应uri
    timeout: 120000 // request timeout
});

export const axiosPlugin = {
    install(app: App, ...options: any[]) {
        app.config.globalProperties.$request = request
        window.$request = request;
    }
}
