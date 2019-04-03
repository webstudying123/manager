
import axios from 'axios'
import Vue from 'vue'
import router from './router';
export default {
   install(){
       //全局axios的导入
Vue.prototype.$axios=axios
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'


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
    
  //  console.log(response);
  if(response.data.meta.msg==='无效token'&&response.data.meta.status==400){
    Vue.prototype.$message('伪造,请先登录')
    window.sessionStorage.removeItem('token')
    //上面这个无法实现,记得找不能实现的原因,这里的vue还没有添加router里,所以不能调用这个方法
    // Vue.prototype.$router.push('/login')
    router.push('/login')
    return
  }


   if( [200,201,204].indexOf(response.data.meta.status)!=-1){
    Vue.prototype.$message.success(response.data.meta.msg)
   }else {
    Vue.prototype.$message.warning(response.data.meta.msg)
   }
    
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
   }
}