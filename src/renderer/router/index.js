import Vue from 'vue'
import Router from 'vue-router'
import layout from "@/layout"

Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/',
            component: layout,
            children: [
                {
                    path: "home",
                    name: "Home",
                    component: () => import("@/views/home/index")
                }
            ]

        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})