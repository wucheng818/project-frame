/*
 * @Author: liuhuitao
 * @Date: 2019-08-23 09:44:47
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-18 16:19:25
 * @description: 应用系统调用接口
 */
import axios from '.';
import { $api } from '@/config';
/**
 * @description 获取字典数据
 */
export const _getDictList = ({ dictTypes, queryKey }) => {
  let params = {
    dictTypes, // 字典类型
    queryKey // 名称
  };
  return axios.request({
    url: $api + '/dict',
    params,
    method: 'get'
  });
};
/**
 * @description 获取省、市、县编码
 */
export const _getAreaCode = ({ cityCode }) => {
  let params = {
    cityCode
  };
  return axios.request({
    url: $api + '/city',
    params,
    method: 'get'
  });
};
