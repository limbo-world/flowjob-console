import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const menuIconPlugin = {
    install(app: App, ...options: any[]) {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
