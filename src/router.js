import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import login from './components/login.vue'
import index from './components/index.vue'

let routes=[
    {path:'/login',component:login},
    {path:'/',component:index}
]

let router=new VueRouter({
    routes
})

export default router