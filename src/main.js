// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//路由
import store from '@/store';//vuex
import RemLayout from '@/assets/js/remLayout'//rem布局
import axios from 'axios'//接口请求
import FastClick from 'fastclick'//fastclick支持
import { AlertPlugin, ToastPlugin,LoadingPlugin,ConfirmPlugin } from 'vux'
Vue.prototype.$ajax=axios //修改Vue的原型属性
//Vue.component('confirm', Confirm)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

if (process.env.NODE_ENV === 'production') {
    // 使用fastclick
    FastClick.attach(document.body);
}

// 请求的API前缀
window.API_ORIGIN = (process.env.IS_PRE || process.env.NODE_ENV === "development") ?
    //'http://192.168.0.141:8040' :
    //'http://yimei.huabeicat.cn';
    'http://yimei.huabeicat.cn' :
    'http://yimei.huabeimao.net';


RemLayout(750);
