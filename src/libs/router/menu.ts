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
        children: [
            {
                code: "201",
                icon: "el-icon-calendar",
                name: "menus.planList",
                route: "/plan/list",
            }, {
                code: "202",
                icon: "el-icon-collection-tag",
                name: "menus.planExecuteRecord",
                route: "/plan/execute-record",
            },
        ]
    },
    {
        code: "300",
        icon: "el-icon-mostly-cloudy",
        name: "menus.workerList",
        route: "/worker/list"
    },
] as Array<MenuConfig>
