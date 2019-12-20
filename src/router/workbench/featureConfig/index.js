/*
 * @Author: liuhuitao
 * @Date: 2019-11-21 11:01:55
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-20 10:50:16
 * @desc 工作台 --> 要素管理
 */
export default [
  {
    path: '/workbench/feature-config/venue-manage',
    name: 'venueManage',
    meta: { title: '场馆管理' },
    component: () =>
      import(
        /* webpackChunkName: "venueManage" */ '@/views/workbench/featureConfig/venueManage/index.vue'
      )
  }
];
