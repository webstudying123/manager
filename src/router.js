import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import login from './components/login.vue'
import index from './components/index.vue'
import users from './components/users.vue'

let routes=[
    {path:'/login',component:login},
    {path:'/',component:index,
    children:[{
        path:'users',component:users
    }]
  }
]

let router=new VueRouter({
    routes
})

export default router