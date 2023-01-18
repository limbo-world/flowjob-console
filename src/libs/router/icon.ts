import { App } from 'vue'
import {
    HomeFilled,
    Menu,
    CollectionTag
} from '@element-plus/icons-vue'

const dictIcons = [
    {"name": "el-icon-home-filled", "icon": HomeFilled},
    {"name": "el-icon-menu", "icon": Menu},
    {"name": "el-icon-collection-tag", "icon": CollectionTag},
]

export const menuIconPlugin = {
    install(app: App, ...options: any[]) {
        for (let dictIcon of dictIcons) {
            app.component(dictIcon.name, dictIcon.icon);
        }
    }
}
