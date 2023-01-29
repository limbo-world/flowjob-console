export default [
    {
        code: "100",
        icon: "el-icon-home-filled",
        name: "menus.home",
        route: "/home",
    },
    {
        code: "200",
        icon: "el-icon-menu",
        name: "menus.planManage",
        children: [{
            code: "201",
            icon: "el-icon-collection-tag",
            name: "menus.planList",
            route: "/plan",
        }]
    }
] as Array<MenuConfig>
