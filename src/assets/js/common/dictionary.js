/*
 * @Author: liuhuitao
 * @Date: 2019-08-29 15:08:40
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-05 13:28:25
 * @description: 前端字典数据
 */
import { _getDictList } from '@/api/app';
import { asyncFn } from '@/utils/mtiUtils';

/**
 * @description 获取字典数据
 */
export const getDepartTypeDictData = async (
  dictTypes,
  dropGroup,
  dropDictData
) => {
  const [err, res] = await asyncFn(
    _getDictList({
      dictTypes
    })
  );
  if (res && res.data) {
    for (let item of res.data) {
      dropGroup.push({
        label: item.dictName,
        value: item.dictCode
      });
      dropDictData[item.dictCode] = item.dictName;
    }
  }
  if (err) {
    dropGroup = [];
    dropDictData = {};
  }
};

// ------ 页面按钮Id字典 ------
export const permisBtnIdSetting = {
  // 组织机构管理
  orgManage: {
    exportOrgBtn: 121,
    editOrgBtn: 122,
    addOrgBtn: 123,
    importOrgBtn: 124,
    deleteOrgBtn: 125
  },
  // 组织性质管理
  orgNature: {
    del: 128,
    edit: 127,
    add: 126
  },
  // 行政区划管理
  adminDiv: {
    del: 131,
    add: 129,
    edit: 130
  },
  // 人员管理
  personManage: {
    add: 136,
    auth: 142,
    toTop: 132,
    del: 133,
    detail: 134,
    cancelToTop: 141,
    moveUp: 140,
    moveDown: 139,
    import: 138,
    export: 137,
    edit: 135
  },
  // 账号管理
  accountManage: {
    detail: 145,
    add: 151,
    del: 143,
    forbid: 144,
    edit: 146,
    resetPassword: 147,
    deviceManage: 148,
    unbindPhone: 149
  },
  // 在线用户管理
  onlineAccountManage: {
    search: 152,
    forceOutline: 169
  },
  // 角色管理
  roleManage: {
    edit: 153,
    del: 157,
    assignPermission: 156,
    forbidRole: 155,
    addApp: 154
  },
  // 权限管理
  anthManage: {
    editApp: 161,
    delItem: 158,
    editItem: 159,
    addApp: 162,
    addItem: 160
  },
  // 日志管理
  logManage: {
    safetyDetail: 165,
    safetySearch: 163,
    safetyDel: 164,
    operateDetail: 166,
    operateSearch: 168,
    operateDel: 167
  }
};
