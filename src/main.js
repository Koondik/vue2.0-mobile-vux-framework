// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import FastClick from 'fastclick';
import App from './App.vue';
import router from './router';
import Utils from './assets/js/util'
import store from './config/store.js'
import api from "./service/api";
//引入mint-ui全局样式
import 'mint-ui/lib/style.css';


// 定义一个全局方法，将这个方法挂载到Vue上
Vue.prototype.utils = Utils;
Vue.prototype.$api = api;
Vue.prototype.$http = axios;
Vue.prototype.showInfo = function (text, onHide) {
  this.$vux.toast.show({
    text: text,
    type: 'text',
    onHide() {
      onHide ? onHide() : '';
    }
  })
};

Vue.prototype.loading = function (text) {
  let self = this;
  this.$vux.loading.show({
    text: text || '正在加载'
  });
};
FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

