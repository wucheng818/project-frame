/*
 * @Author: liuhuitao
 * @Date: 2018-10-02 11:21:09
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-18 14:51:25
 * @description: axios 配置文件
 */
import axios from 'axios';
import store from '@/store';
import router from '../router';
import { Message } from 'element-ui';
// import { getToken } from '@/utils';
const service = axios.create({
  timeout: 10000 // 设置超时时间
  // baseURL: process.env.VUE_APP_BASE_URL
});
const jumpToLoginPage = () => {
  store.dispatch('user/directEmptyUserState').then((res) => {
    store.dispatch('monitor/WEBSOCKET_CLOSE');
    store.dispatch('permission/clearPermission');
  });
  setTimeout(() => {
    router.replace({
      path: '/login'
    });
  }, 1000);
};
service.defaults.headers.post['Content-Type'] = 'application/json';
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
let loading = null;
service.interceptors.request.use(
  (config) => {
    // 在请求先展示加载框
    // loading = Loading.service({
    //   text: '正在加载中......'
    // });
    // config.headers['x-app-code'] = 'uum';
    // if (config.url === 'uum/login') {
    //   config.headers['x-end-point'] = 'WEB';
    // }
    // const token = getToken();
    // if (token) {
    //   config.headers['x-token'] = token;
    // }
    // 解决Ie浏览器缓存
    // if (config.method === 'get') {
    //   config.params = {
    //     _t: Date.parse(new Date()) / 1000,
    //     ...config.params
    //   };
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(
  (response) => {
    // 请求响应后关闭加载框
    // if (loading) {
    //   loading.close()
    // }
    const responseCode = response.status;
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
      // mti 业务code 约定
      let busCode = response.data.code;
      let busMessage = response.data.message;
      switch (busCode) {
      // 请求头没有[token]参数(建议重新登录)
      case '600100':
        Message({
          message: busMessage + '请重新登录系统',
          type: 'error'
        });
        jumpToLoginPage();
        break;
        // 当前账户已经被强踢下线
      case '600110':
        Message({
          message: busMessage + '请重新登录系统',
          type: 'error'
        });
        jumpToLoginPage();
        break;
        // 当前帐号已经在其它地方登录,被迫下线
      case '600105':
        Message({
          message: busMessage,
          type: 'error'
        });
        jumpToLoginPage();
        break;
        // 当前TOKEN已过期,被迫下线
      case '699103':
        Message({
          message: busMessage,
          type: 'error'
        });
        jumpToLoginPage();
        break;
      case '999901':
        Message({
          message: busMessage,
          type: 'error'
        });
        break;
      case '000000':
        return Promise.resolve(response.data);
      default:
        return Promise.resolve(response.data);
      }
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    // 请求响应后关闭加载框
    if (loading) {
      loading.close();
    }
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        Message.error('请求超时，请检查网络是否连接正常');
      } else {
        // 可以展示断网组件
        Message.error('请求失败，请检查网络是否已连接');
      }
      return;
    }
    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status;

    switch (responseCode) {
    // 401：未登录
    case 401:
      // 跳转登录页
      jumpToLoginPage();
      break;
      // 403: token过期
    case 403:
      // 弹出错误信息
      Message({
        type: 'error',
        message: '登录信息过期，请重新登录'
      });
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      jumpToLoginPage();
      break;
      // 404请求不存在
    case 404:
      Message({
        message: '网络请求不存在',
        type: 'error'
      });
      break;
    case 500:
      Message({
        message: '服务器连接异常,请通知管理员抢修',
        type: 'error'
      });
      break;
      // 其他错误，直接抛出错误提示
    default:
      Message({
        message: error.response.data.message,
        type: 'error'
      });
    }
    return Promise.reject(error);
  }
);

export default service;
/**
 *
 * @param {String} url 上传服务器路径
 * @param {Object} file 上传文件
 * @description upload file(文件服务器：$file + '/uploadFilesToFast'【'http://10.168.31.224:8940/uploadFilesToFast'】)
 */
export const _uploadFile = (url, file) => {
  // eslint-disable-next-line no-use-before-define
  let data = new FormData();
  data.append('file', file);
  return service.request({
    method: 'post',
    url,
    data
    // responseType: 'blob', // 必须注明返回二进制流
    // headers: { 'Content-Type': 'multipart/form-data' }
  });
};
