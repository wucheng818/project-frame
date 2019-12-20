/*
 * @Author: liuhuitao
 * @Date: 2019-08-22 14:16:35
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-11-15 15:51:54
 * @description: 权限
 */
// import { workbenchRouter } from '@/config/menuConfig';
const state = {
  defaultToPath: '', // 默认跳转路径
  menuTreeData: [], // 左侧菜单树
  permisBtnIds: [] // 按钮Id
};

const mutations = {
  setMenuTreeData (state, menuConfig) {
    state.menuTreeData = menuConfig;
  },
  setDefToPath (state, path) {
    // state.defaultToPath = path;
    state.defaultToPath = '/home';
  },
  setPerBtnData (state, btnIds) {
    state.permisBtnIds = btnIds;
  }
};
const getters = {
  getMenuTreeData (state) {
    return state.menuTreeData;
  },
  getDefaultToPath (state) {
    return state.defaultToPath;
  },
  getPermisBtnIds (state) {
    return state.permisBtnIds;
  }
};
const actions = {
  setHasMenuData: async ({ commit }, menuTreeData) => {
    commit('setMenuTreeData', menuTreeData);
    // commit('setMenuTreeData', workbenchRouter);
  },
  setDefaultToPath: ({ commit }, path) => {
    commit('setDefToPath', path);
  },
  setPerBtnData: ({ commit }, btnIds) => {
    commit('setPerBtnData', btnIds);
  },
  clearPermission: ({ commit }) => {
    commit('setMenuTreeData', []);
    commit('setDefToPath', '');
    commit('setPerBtnData', []);
  }
};
export default {
  namespaced: true, // 开启namespace:true，该模块就成为命名空间模块了
  state,
  actions,
  mutations,
  getters
};
