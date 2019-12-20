/*
 * @Author: liuhuitao
 * @Date: 2019-08-23 11:22:50
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-20 10:50:38
 * @Description: 左侧菜单jsonTree 配置格式
 */
// 专题路由

// 指挥台看板路由

// 中台管理路由
const workbenchRouter = [
  {
    name: '要素管理',
    path: '/workbench/feature-config',
    icon: 'feature_config_menu',
    children: [
      {
        name: '场馆管理',
        path: '/workbench/feature-config/venue-manage',
        icon: 'submenu'
      }
    ]
  }
];

export { workbenchRouter };
