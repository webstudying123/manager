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

//导入自己封装的axios插件
import myaxios from './myaxios.js'
Vue.use(myaxios)

//面包屑导航
import bread from './components/bread.vue'
Vue.component('mybread',bread)


//引入全局的样式
import './assets/base.scss'

//导入elmui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)






//路由的导入
import router from './router.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
