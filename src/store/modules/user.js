/*
 * @Author: liuhuitao
 * @Date: 2019-08-11 11:04:38
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-05 13:26:42
 * @description: User Information
 */
import { _login, _loginOut } from '@/api/user';
import { getToken, setToken, deleteToken } from '@/utils';
const state = {
  token: getToken(),
  access: '',
  userName: '',
  userId: '',
  userRole: [],
  expirationTimestamp: ''
};
const mutations = {
  setToken (state, token) {
    state.token = token;
  },
  setUserName (state, username) {
    state.userName = username;
  },
  setUserId (state, userId) {
    state.userId = userId;
  },
  setUserRole (state, userRole) {
    state.userRole = userRole;
  },
  setExpirationTimestamp (state, expirationTimestamp) {
    state.expirationTimestamp = expirationTimestamp;
  }
};
const getters = {
  getUserName (state) {
    return state.userName;
  },
  getExpirationTimestamp (state) {
    return state.expirationTimestamp;
  }
};
const actions = {
  // 用户名登录
  handleLogin: async ({ commit }, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await _login(data);
        if (res && res.data) {
          commit('setToken', res.data.token);
          commit('setUserName', res.data.userName);
          commit('setUserId', res.data.userId);
          commit('setUserRole', []);
          commit('setExpirationTimestamp', res.data.expiredTimestamp);
          setToken(res.data.token);
        }
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },
  loginOut: async ({ commit }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await _loginOut();
        if (res && res.data) {
          commit('setToken', '');
          commit('setUserName', '');
          commit('setUserId', '');
          commit('setUserRole', []);
          commit('setExpirationTimestamp', '');
          deleteToken();
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  directEmptyUserState ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('setToken', '');
        commit('setUserName', '');
        commit('setUserId', '');
        commit('setUserRole', []);
        commit('setExpirationTimestamp', '');
        deleteToken();
        resolve('finished');
      } catch (error) {
        reject(error);
      }
    });
  }
};
export default {
  namespaced: true, // 开启namespace:true，该模块就成为命名空间模块了
  state,
  actions,
  mutations,
  getters
};
