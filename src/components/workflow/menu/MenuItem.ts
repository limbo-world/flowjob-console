

/** 
 * 菜单项
 */
export default interface MenuItem {
    menuId: string,
    menuIcon: string,
    menuName: string,
    menuCallback: (id: string) => void
}