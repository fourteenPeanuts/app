// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/icons' // icon
import store from './store'//引入vuex
import Axios from 'axios'
import VueAxios from 'vue-axios'
// 引入echarts插件
import echarts from 'echarts'
//引入权限
import '@/permission'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI,VueAxios, Axios, {
  size: 'mini',
}) //新添加
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
