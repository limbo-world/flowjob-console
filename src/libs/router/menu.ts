export default [
    {
        code: "100",
        icon: "el-icon-home-filled",
        name: "menus.home",
        route: "/home",
    },
    {
        code: "200",
        icon: "el-icon-calendar",
        name: "menus.planList",
        route: "/plan/list"
    },
    {
        code: "300",
        icon: "el-icon-calendar",
        name: "menus.delayInstanceList",
        route: "/delay-instance/list"
    },
    // {
    //     code: "200",
    //     icon: "el-icon-menu",
    //     name: "menus.planManage",
    //     children: [
    //         {
    //             code: "201",
    //             icon: "el-icon-calendar",
    //             name: "menus.planList",
    //             route: "/plan/list",
    //         }, {
    //             code: "202",
    //             icon: "el-icon-collection-tag",
    //             name: "menus.planExecuteRecord",
    //             route: "/plan/instance/list",
    //         },
    //     ]
    // },
    {
        code: "400",
        icon: "el-icon-mostly-cloudy",
        name: "menus.workerList",
        route: "/worker/list"
    },
    // {
    //     code: "998",
    //     icon: "el-icon-mostly-cloudy",
    //     name: "测试 Demo 组件",
    //     route: "/test/workflow-demo"
    // },
    // {
    //     code: "999",
    //     icon: "el-icon-mostly-cloudy",
    //     name: "测试 Workflow 组件",
    //     route: "/test/workflow-test"
    // },
] as Array<MenuConfig>
