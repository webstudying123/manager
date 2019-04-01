import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//定义全局过滤器
import moment from 'moment'
Vue.filter('globalformattime',function(value,formattemplate){
  if(formattemplate){
    return moment(value).format(formattemplate)
  }else {
    return moment(value).format('YYYY-MM-DD')
  }
})

//全局axios的导入
import axios from 'axios'
Vue.prototype.$axios=axios
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'


//面包屑导航
import bread from './components/bread.vue'
Vue.component('mybread',bread)


//引入全局的样式
import './assets/base.scss'

//导入elmui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)



//设置拦截器
axios.interceptors.request.use(function (config) {
  // console.log('开始了');
  // console.log(config);
  config.headers.Authorization=window.sessionStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
 if( [200,201,204].indexOf(response.data.meta.status)!=-1){
  Vue.prototype.$message.success(response.data.meta.msg)
 }else {
  Vue.prototype.$message.warning(response.data.meta.msg)
 }
  
  return response;
}, function (error) {
  return Promise.reject(error);
});



//路由的导入
import router from './router.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
