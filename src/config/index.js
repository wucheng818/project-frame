/*
 * @Author: liuhuitao
 * @Date: 2019-07-2 9:10:2
 * @Last Modified by: niyining
 * @Last Modified time: 2019-12-13 10:04:42
 * description: uum 配置文件(import {} from '@/config')
 */
export const uumConfig = {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '昆明大保',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: {
      api: 'api', // api服务
      map: 'map', // 地图服务
      file: 'file', // 上传文件服务,
      source: 'source', // 上传文件拿到的文件服务
      monitor: 'monitor'
    }, // 开发模式本地服务
    pro: {
      api: 'api',
      map: 'map',
      file: 'file',
      source: 'source',
      monitor: 'monitor'
    } // 生产模式线上服务
  }
};
let env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
const $api = uumConfig.baseUrl[env].api;
const $map = uumConfig.baseUrl[env].map;
const $file = uumConfig.baseUrl[env].file;
const $source = uumConfig.baseUrl[env].source;
const $monitor = uumConfig.baseUrl[env].monitor;
const projectTitle = uumConfig.title;
export { $api, $map, $file, $source, $monitor, projectTitle };
