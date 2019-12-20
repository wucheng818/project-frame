/*
 * @Author: liuhuitao
 * @Date: 2019-08-12 16:39:40
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-06 14:36:16
 * @description: mtiUtils
 */
import { projectTitle } from '@/config';
import _ from 'lodash';
/* eslint-disable */
/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export function isPhoneNum(str) {
  let rep = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  if (!rep.test(str)) {
    return false;
  } else {
    return true;
  }
}
/**
 *
 * @param {String} landlineNum 座机号
 * @description 校验是都是座机号
 */
export const checkLandlineNum = landlineNum => {
  let rep = /^0\d{2,3}-\d{7,8}$/;
  if (!rep.test(landlineNum)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {*} phoneNumber
 * @description 校验电话号（含座机、手机号）
 */
export const checkPhoneNumber = phoneNumber => {
  let rep = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
  if (!rep.test(phoneNumber)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} ip Ip
 * @description 校验是否为 IP
 */
export const checkIp = ip => {
  let rep = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (!rep.test(ip)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} networkSegment 网段(https://www.jb51.net/article/80690.htm)
 * @description 校验网段(如：匹配 192.168.100.1/24 | 0.0.0.0/0，不匹配 192.168.100.1/33 | 0.0.0.0/90)
 */
export const checkNetworkSegment = networkSegment => {
  let rep = /^(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])\/(\d{1}|[0-2]{1}\d{1}|3[0-2])$/;
  if (!rep.test(networkSegment)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} str
 * @description 验证是否由字母或数字组成
 */
export const checkNumLetter = str => {
  let rep = /^[A-Za-z0-9]+$/;
  if (!rep.test(str)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} str
 * @description 验证是否由字母或数字组成【多个用逗号隔开(非首末尾)】
 */
export const checkNumLetterComma = str => {
  let rep = /^(?!,)(?!.*?,$)[A-Za-z0-9,]+$/;
  if (!rep.test(str)) {
    return false;
  } else {
    return true;
  }
};

/**
 *
 * @param {String} name
 * @description 匹配汉字或字母
 */
export const checkLetterAndChinese = name => {
  let rep = /^[A-Za-z\u4e00-\u9fa5]+$/;
  if (!rep.test(name)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} name
 * @description 匹配汉字字母或数字
 */
export const checkLetChinNum = name => {
  let rep = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
  if (!rep.test(name)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} name
 * @description 匹配汉字字母数字下划线
 */
export const checkLetChinNumUnder = name => {
  // let rep = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/; //不能以下划线开头结尾
  let rep = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/; //下划线不限制
  if (!rep.test(name)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} str
 * @description 匹配汉字字母数字逗号(不能以逗号开头结尾)
 */
export const checkLetChinNumComma = str => {
  let rep = /^(?!,)(?!.*?,$)(?!，)(?!.*?，$)[a-zA-Z0-9,，\u4e00-\u9fa5]+$/; //不能以逗号开头结尾
  // ^[a-zA-Z0-9,\u4e00-\u9fa5]+$ //逗号位置不限制
  if (!rep.test(str)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {String} pass 密码
 * @description 验证用户密码(正确格式为： 长度在6~20 之间，由字母、数字或下划线组成)
 */
export const checkPassword = pass => {
  let rep = /^(\w){6,20}$/;
  if (!rep.test(pass)) {
    return false;
  } else {
    return true;
  }
};
/**
 * @description:获取唯一 Id
 */
export const getUniqueId = () => {
  let lastUuid = _.uniqueId();
  let randomNum = _.random(0, 99);
  return new Date().getTime() * randomNum + (lastUuid++ % lastUuid);
};
/**
 *
 * @param {*} imsiNum
 * @description 校验 IMSI
 *   IMSI全称是International Mobile Subscriber Identification Number,我们的手机号码在系统中是被转换为IMSI进行通信的
 *   当你的手机开机后在接入网络的过程中有一个注册登记的过程，系统通过控制信道将经加密算法后的参数组传送给客户，手机中的SIM卡收到参数后，
 *   与SIM卡存储的客户鉴权参数经同样算法后对比，结果相同就允许接入，否则为非法客户，网络拒绝为此客户服务。
 *
 *   IMSI共有15位，其结构如下：MCC+MNC+MSIN
 *   MCC：Mobile Country Code，移动国家码，MCC的资源由国际电联（ITU）统一分配和管理，唯一识别移动用户所属的国家，共3位，中国为460;
 *   MNC: Mobile Network Code，移动网络码，2~3位，中国移动系统使用00、02、07，中国联通GSM系统使用01、06，中国电信CDMA系统使用03、05，中国铁通系统使用20，
 *   一个典型的IMSI号码为460030912121001;
 *   MSIN:Mobile Subscriber Identification Number, 移动用户识别号码,共有10位，其结构如下：EF+M0M1M2M3+ABCD
 */
export const checkImsi = imsiNum => {
  let rep = /^4600[0,1,2,3,5,6,7]\d{10}$/g;
  if (!rep.test(imsiNum)) {
    return false;
  } else {
    return true;
  }
};
/**
 *
 * @param {Object} a -对象参数a
 * @param {Object} b -对象参数b
 * @description: 比较两个对象是否完全相同
 */
export const isObjectValueEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    var propA = a[propName];
    var propB = b[propName];
    if (typeof propA === 'object') {
      if (this.isObjectValueEqual(propA, propB)) {
        return true;
      } else {
        return false;
      }
    } else if (propA !== propB) {
      return false;
    } else {
    }
  }
  return true;
};
/**
 *
 * @param {Object} promise
 * @description 获取异步数据
 * @example const [err, res] = await asyncFn(fn());
 */
export const asyncFn = promise => {
  return promise.then(data => [null, data]).catch(err => [err]);
};

/**
 *
 * @param {String} pageTitle 页面title
 * @description 设置标题
 */
export const getPageTitle = pageTitle => {
  if (pageTitle) {
    return `${pageTitle} - ${projectTitle}`;
  }
  return `${projectTitle}`;
};
/**
 * @description 字符串转换
 */
export const handleStr = {
  //把字串连接起来，例如：func.join('a','b','c','d',';') => a;b;c;d
  join: function() {
    if (arguments.length <= 2) return arguments[0];
    var datas = [];
    var delimter = arguments[arguments.length - 1];
    for (let i = 0; i < arguments.length - 1; i++) {
      if (/^\s*$/.test(arguments[i])) continue;
      datas.push(arguments[i]);
    }
    return datas.join(delimter);
  },
  //转为下划线：func.underline('userRole',true) => USER_ROLE
  //转为下划线：func.underline('userRole',false) => user_role
  underline: function(str, upper) {
    const ret = str.replace(/([A-Z])/g, '_$1');
    if (upper) {
      return ret.toUpperCase();
    } else {
      return ret.toLowerCase();
    }
  },
  //转驼峰表示：func.camel('USER_ROLE',true) => UserRole
  //转驼峰表示：func.camel('USER_ROLE',false) => userRole
  camel: function(str, firstUpper) {
    let ret = str.toLowerCase();
    ret = ret.replace(/_([\w+])/g, function(all, letter) {
      return letter.toUpperCase();
    });
    if (firstUpper) {
      ret = ret.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2;
      });
    }
    return ret;
  }
};
/**
 * @name: 深拷贝
 * @Author: ZhengPan
 * @test: test font
 * @msg:
 * @param {Object} obj
 * @return: {Object}
 * @example:
 */
export function _deepClone(obj, flagJumpOverFn) {
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (obj.constructor === Date) return new Date(obj);
  var newObj = new obj.constructor(); //保持继承链
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 是否跳过函数
      if (flagJumpOverFn && typeof obj[key] === 'function') {
        continue;
      }
      //不遍历其原型链上的属性
      newObj[key] = _deepClone(obj[key], flagJumpOverFn);
    }
  }
  return newObj;
}
/**
 * @name: listToTree
 * @Author: ZhengPan
 * @test: test font
 * @msg:
 * @param {Array} list 原始list数据
 * @param {Object} [params] 对象的key值
 * @param {Object} [addObj] 转换过程中需要加入的属性{浅对象}
 * @return: {Array}
 * @example:
 */
export function _listToTree(
  list,
  { rootId = -1, cname = 'children', cidname = 'cid', pidname = 'pid' } = {},
  addObj = {}
) {
  const cloneData = _deepClone(list, true); // 对源数据深度克隆
  const addObjTemp = _deepClone(addObj, true);
  const arr = cloneData.filter(father => {
    // 复制要添加的项
    father = Object.assign(father, addObjTemp);
    let branchArr = cloneData.filter(
      child => father[cidname] === child[pidname]
    ); // 返回每一项的子级数组
    branchArr.length > 0 ? (father[cname] = branchArr) : ''; // 给父级添加一个children属性，并赋值
    father._id = father[pidname] + '-' + father[cidname]; // 添加一个_id内部属性 ，唯一标识每一项
    return father[pidname] === rootId; //返回第一层
  });
  return arr;
}

/**
 * @name: treeToList
 * @Author: ZhengPan
 * @test: test font
 * @msg: tree数据转换为list
 * @param {Array} tree 原始tree数据
 * @param {Object} [params] 对象的key值
 * @param {Object} [keepKeys] 需要保留的属性-默认删除'_id'
 * @return: {Array}
 * @example:
 */
export function _treeToList(
  tree,
  { rootId = -1, cname = 'children', cidname = 'cid', pidname = 'pid' } = {},
  keepKeys = []
) {
  let temp = [];

  function getList(tree, pid) {
    tree.forEach(item => {
      const itemKeepKeys = keepKeys.length ? keepKeys : Object.keys(item);
      // 删除
      delete itemKeepKeys['_id'];
      delete itemKeepKeys[cname];
      const itemClone = {};
      itemKeepKeys.forEach(key => {
        itemClone[key] = item[key];
      });

      itemClone[pidname] = pid;

      temp.push(itemClone);

      let childrenList = item[cname];

      if (childrenList && childrenList.length) {
        // 如果有children继续循环
        getList(childrenList, itemClone[cidname]);
      }
    });
  }
  getList(tree, rootId);
  return temp;
}
