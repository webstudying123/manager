import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import login from "./components/login.vue";
import index from "./components/index.vue";
import users from "./components/users.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import goods from "./components/goods.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import params from "./components/params.vue";
import reports from "./components/reports.vue";
import error from "./components/error.vue";

let routes = [
  {path:'/error',component:error},
  {path:'/',redirect:'/users'},
  { path: "/login", component: login ,meta:{
    nologin:true
  }},
  {
    path: "/",
    component: index,
    children: [
      {
        path: "users",
        component: users
      },
      {
        path: "roles",
        component: roles
      },
      {
        path: "rights",
        component: rights
      },
      {
        path: "goods",
        component: goods
      },
      {
        path: "categories",
        component: categories
      },
      {
        path: "orders",
        component: orders
      },
      {
        path: "params",
        component: params
      },
      {
        path: "reports",
        component: reports
      }
    ]
  }
];



let router = new VueRouter({
  routes
});


//导航守卫
router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
    //设置404错误页面
    // if(response)
    if(to.matched.length===0){
      Vue.prototype.$message('输入地址有误')
      next('/error')
    }
    // console.log(to);
    // if(to.path=='/login'){
      if(to.meta.nologin==true){
      next()
    }else {
      if(window.sessionStorage.getItem('token')){
        next()
      }else {
        Vue.prototype.$message('请先登录')
        next('/login')
      }
    }
    
})

export default router;
