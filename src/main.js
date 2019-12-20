import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './components';
import './assets/icons';
import './assets/images';
import './directive';
import './lib/element-ui';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

import { confirmOperation } from '@/utils';
// vue实例扩展属性和方法
Object.assign(Vue.prototype, {
  $confirmOperation: confirmOperation
});
// 定义全局订阅发布机制
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
