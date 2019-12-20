/*
 * @Author: liuhuitao
 * @Date: 2019-08-6 9:10:27
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-09-26 15:14:55
 */
import Vue from 'vue';

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./global', true, /\.js$/);

componentsContext.keys().forEach((component) => {
  const componentConfig = componentsContext(component);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  const ctrl = componentConfig.default || componentConfig;
  // console.log('ctrl.name', ctrl.name);
  Vue.component(ctrl.name, ctrl);
});
