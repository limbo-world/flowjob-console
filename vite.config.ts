import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env': {},
    },
    server: {
        port: 8080,
        proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
            '^/api': { // 正则表达式写法
                target: 'http://localhost:8081', // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/api/, '/api')
            }
        }
    },
    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve('./src'),
        },
    },
});
