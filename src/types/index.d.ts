interface Window {
    $request: any
}

/**
 * @description 菜单配置
 */
interface MenuConfig {
    /** 唯一 */
    code: string;
    /** 名称 */
    name: string;
    /** 菜单图标 */
    icon?: string | FunctionalComponent | IconifyIcon;
    /** 路由 */
    route?: string;
    /** 子路菜单 */
    children?: Array<MenuConfig>;
}
