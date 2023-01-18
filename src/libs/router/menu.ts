export default [
    {
        code: "100",
        name: "menus.home",
        route: "/home",
    },
    {
        code: "200",
        name: "menus.planManage",
        children: [{
            code: "201",
            name: "menus.planList",
            route: "/plan",
        }]
    }
] as Array<MenuConfig>
