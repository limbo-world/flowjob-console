import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {},
  },
  server: {
    port: 8080
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
