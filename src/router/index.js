/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/*
 * @Author: liuhuitao
 * @Date: 2019-08-6 9:42:21
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-04 11:43:26
 */
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Index from '@/views/workbench/index.vue';
import { getUserInfo } from '@/api/user';
import { getToken } from '@/utils';
import { asyncFn, _listToTree, getPageTitle } from '@/utils/mtiUtils';
import { Message } from 'element-ui';
Vue.use(Router);

const IndexRoute = {
  path: '/',
  component: Index,
  redirect: '/home',
  children: []
};

let routes = [
  IndexRoute,
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
  },
  {
    path: '/description',
    name: 'description',
    meta: { title: '参考说明' },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/description/index.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/errorPage/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
];
const whiteList = ['/login', '/404']; // no redirect whitelist

const routerContext = require.context('./', true, /index\.js$/);
routerContext.keys().forEach((route) => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  IndexRoute.children = [
    ...IndexRoute.children,
    ...(routerModule.default || routerModule)
  ];
});
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes,
    mode: 'hash' // 后端配置 - https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
  });

const router = createRouter();

export default router;
