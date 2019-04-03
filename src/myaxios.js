
import axios from 'axios'
import Vue from 'vue'
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