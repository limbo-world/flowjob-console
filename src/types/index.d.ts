interface Window {
    $request: any
}

/**
 * @description 菜单配置
 */
interface MenuConfig {
    /** 唯一 */
    code: string;
    /** 名称 对应 i18n的名字解析 */
    name: string;
    /** 菜单图标 */
    icon?: string | FunctionalComponent | IconifyIcon;
    /** 路由 路由路径 */
    route?: string;
    /** 子路菜单 */
    children?: Array<MenuConfig>;
}

interface NodeStatus {
    id: string
    status: 'default' | 'success' | 'failed' | 'running'
    label?: string
}

interface Label {
    key?: string; // 唯一键
    label: string; // 展示文本
    value: any; // 具体值
}
