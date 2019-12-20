/*
 * @Author: liuhuitao
 * @Date: 2019-08-19 11:47:05
 * @LastEditTime: 2019-08-20 14:57:34
 * @LastEditors: ZhengPan
 */
/**
 *
 * @param {String} key
 * @param {String} value
 * @description 设置 loacalStorage
 */
export function setLocalStorage (key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}
/**
 *
 * @param {String} key
 * @description 获取 loacalStorage
 */
export function getLocalStorage (key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return '';
  }
}
/**
 *
 * @param {*} key
 * @description 删除 loacalStorage
 */
export function deleteLocalStorage (key) {
  localStorage.removeItem(key);
}
/**
 *
 * @param {String} key
 * @param {String} value
 * @description 设置 sessionStorage
 */
export function setSessionStorage (key, value) {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}
/**
 *
 * @param {String} key
 * @description 获取 sessionStorage
 */
export function getSessionStorage (key) {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    return '';
  }
}
/**
 *
 * @param {*} key
 * @description 删除 sessionStorage
 */
export function deleteSessionStorage (key) {
  sessionStorage.removeItem(key);
}
// ------------- token操作 START -------------
export function setToken (token) {
  setSessionStorage('token', token);
}
export function getToken () {
  return getSessionStorage('token');
}
export function deleteToken () {
  deleteSessionStorage('token');
  deleteSessionStorage('vuex');
}
// ------------- token操作 End ---------------
export class LocalStorage {
  static setItem (key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }
  static getItem (key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return '';
    }
  }
}
export class SessionStorage {
  static setItem (key, value) {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }
  static getItem (key) {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      return '';
    }
  }
}
/**
 *
 * @param {Object} res :response data
 * @param {String} fileName :file name
 * @description: 释放导出的文件流
 */
export function releaseFileStream (res, fileName) {
  let blob = new Blob([res], { type: 'application/json;charset=utf-8' });
  // for IE
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    // for Non-IE (chrome, firefox etc.)
    let downloadElement = document.createElement('a');
    let href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; // 下载后文件名('组织机构.xls')
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
}
/**
 *
 * @param {String} tipsContent 提示信息
 * @param {String} tipsTitle 提示标题
 * @description:操作提示(一般用于信息删除)
 */
export function confirmOperation (tipsContent, tipsTitle = '提示') {
  return this.$confirm(tipsContent, tipsTitle, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
    // modal: false
  });
}

/**
 *
 * @param {Number} btnId 绑定的按钮Id
 * @param {Array} btnIdGroup 用户权限按钮 Id
 * @description 权限检查方法
 */
export const isHasPerms = (btnId, btnIdGroup) => {
  let isExist = false;
  let buttonPermsArr = btnIdGroup;
  if (buttonPermsArr.length === 0 || buttonPermsArr === null) {
    return false;
  }
  if (buttonPermsArr.indexOf(btnId) > -1) {
    isExist = true;
  }
  return isExist;
};

// 节点多选框选择时触发
export const checkChange = (data, oThisTree, treeData) => {
  let aKey = getCheckedKeys(treeData, oThisTree.getCheckedKeys(), 'itemId');
  let newKeys = [];
  let keys = [];
  getChildsKeys(oThisTree.getNode(data.itemId), keys);
  if (oThisTree.getCheckedKeys().indexOf(data.itemId) !== -1) {
    oThisTree.setCheckedKeys(aKey.concat(keys));
  } else {
    // 下面的子节点全部清空
    aKey.forEach((v) => {
      if (keys.indexOf(v) === -1) newKeys.push(v);
    });
    oThisTree.setCheckedKeys(newKeys);
  }
};
// 获取点击节点下面的子节点
function getChildsKeys (e, keys = []) {
  keys.push(e.data.itemId);
  if (e.childNodes.length > 0) {
    for (let itemNode of e.childNodes) {
      getChildsKeys(itemNode, keys);
    }
  }
}
// 获取点击节点上面的父节点
function getCheckedKeys (data, keys, key) {
  let res = [];
  recursion(data, false);
  return res;
  // arr -> 树形总数据
  // keys -> getCheckedKeys获取到的选中key值
  // isChild -> 用来判断是否是子节点
  function recursion (arr, isChild) {
    let aCheck = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      aCheck[i] = false;

      if (obj.children) {
        aCheck[i] = recursion(obj.children, true) ? true : aCheck[i];
        if (aCheck[i]) {
          res.push(obj[key]);
        }
      }

      for (let j = 0; j < keys.length; j++) {
        if (obj[key] === keys[j]) {
          aCheck[i] = true;
          if (res.indexOf(obj[key]) === -1) {
            res.push(obj[key]);
          }
          break;
        }
      }
    }
    if (isChild) {
      return aCheck.indexOf(true) !== -1;
    }
  }
}
