/*
 * @Author: liuhuitao
 * @Date: 2019-12-04 10:41:38
 * @Last Modified by: liuhuitao
 * @Last Modified time: 2019-12-19 17:11:37
 * @desc 要素管理接口
 */
import axios from '~api/index';
import { $api } from '@/config';
// ---- 场馆管理 Start -----
export const _getVenueList = ({ pageSize, currentPage, buildingName }) => {
  const params = {
    pageSize,
    currentPage,
    buildingName
  };

  return axios.request({
    url: $api + '/page/building',
    params,
    method: 'get'
  });
};
export const _getVenueDeail = (buildingId) => {
  return axios.request({
    url: `${$api}/buildingDetail/${buildingId}`,
    method: 'get'
  });
};
export const _addVenue = (data) => {
  return axios.request({
    url: $api + '/building',
    data,
    method: 'put'
  });
};
export const _editVenue = (data) => {
  return axios.request({
    url: $api + '/building',
    data,
    method: 'post'
  });
};
export const _deleteVenue = (buildingId) => {
  return axios.request({
    url: `${$api}/building/${buildingId}`,
    method: 'delete'
  });
};
export const _disableVenue = (buildingId) => {
  return axios.request({
    url: `${$api}/prohibitBuildingStatus/${buildingId}`,
    method: 'post'
  });
};
export const _enableVenue = (buildingId) => {
  return axios.request({
    url: `${$api}/enableBuildingStatus/${buildingId}`,
    method: 'post'
  });
};
// ----车辆管理 Start -----
export const _getVehList = ({
  pageSize,
  currentPage,
  carType,
  carModel,
  carCode
}) => {
  const params = { pageSize, currentPage, carType, carModel, carCode };

  return axios.request({
    url: $api + '/page/car',
    params,
    method: 'get'
  });
};
export const _addVeh = (data) => {
  return axios.request({
    url: $api + '/car',
    data,
    method: 'put'
  });
};
export const _editVeh = (data) => {
  return axios.request({
    url: $api + '/car',
    data,
    method: 'post'
  });
};
export const _deleteVeh = (carId) => {
  return axios.request({
    url: `${$api}/car/${carId}`,
    method: 'delete'
  });
};
export const _disableVeh = (carId) => {
  return axios.request({
    url: `${$api}/prohibitCarStatus/${carId}`,
    method: 'post'
  });
};
export const _enableVeh = (carId) => {
  return axios.request({
    url: `${$api}/enableCarStatus/${carId}`,
    method: 'post'
  });
};

// ---- 指挥部管理 Start -----
export const _getCommandList = ({ pageSize, currentPage, hqName }) => {
  const params = { pageSize, currentPage, hqName };

  return axios.request({
    url: $api + '/page/headquarter',
    params,
    method: 'get'
  });
};

// ---- 团组管理 Start -----
export const _getGroupList = (params) => {
  return axios.request({
    url: $api + '/page/group',
    params,
    method: 'get'
  });
};
export const _addGroup = (data) => {
  return axios.request({
    url: $api + '/group',
    data,
    method: 'put'
  });
};
export const _editGroup = (data) => {
  return axios.request({
    url: $api + '/group',
    data,
    method: 'post'
  });
};
export const _deleteGroup = (groupId) => {
  return axios.request({
    url: `${$api}/group/${groupId}`,
    method: 'delete'
  });
};
export const _disableGroup = (groupId) => {
  return axios.request({
    url: `${$api}/prohibitGroupStatus/${groupId}`,
    method: 'post'
  });
};
export const _enableGroup = (groupId) => {
  return axios.request({
    url: `${$api}/enableGroupStatus/${groupId}`,
    method: 'post'
  });
};

// ---- 住地管理 Start -----
export const _getResidenceList = (params) => {
  return axios.request({
    url: $api + '/page/place',
    params,
    method: 'get'
  });
};
export const _addResidence = (data) => {
  return axios.request({
    url: $api + '/place',
    data,
    method: 'put'
  });
};
export const _editResidence = (data) => {
  return axios.request({
    url: $api + '/place',
    data,
    method: 'post'
  });
};
export const _deleteResidence = (placeId) => {
  return axios.request({
    url: `${$api}/place/${placeId}`,
    method: 'delete'
  });
};
export const _disableResidence = (placeId) => {
  return axios.request({
    url: `${$api}/prohibitPlaceStatus/${placeId}`,
    method: 'post'
  });
};
export const _enableResidence = (placeId) => {
  return axios.request({
    url: `${$api}/enablePlaceStatus/${placeId}`,
    method: 'post'
  });
};

// ---- 新闻媒体管理 Start -----
export const _getMediaList = (params) => {
  return axios.request({
    url: $api + '/page/media',
    params,
    method: 'get'
  });
};
export const _getMediaDeail = (mediaId) => {
  return axios.request({
    url: `${$api}/mediaDetail/${mediaId}`,
    method: 'get'
  });
};
export const _addMedia = (data) => {
  return axios.request({
    url: $api + '/media',
    data,
    method: 'put'
  });
};
export const _editMedia = (data) => {
  return axios.request({
    url: $api + '/media',
    data,
    method: 'post'
  });
};
export const _deleteMedia = (mediaId) => {
  return axios.request({
    url: `${$api}/media/${mediaId}`,
    method: 'delete'
  });
};
export const _disableMedia = (mediaId) => {
  return axios.request({
    url: `${$api}/prohibitMediaStatus/${mediaId}`,
    method: 'post'
  });
};
export const _enableMedia = (mediaId) => {
  return axios.request({
    url: `${$api}/enableMediaStatus/${mediaId}`,
    method: 'post'
  });
};
export const _exportTemplet = (url) => {
  return axios.request({
    url: $api + '/downloadMediaExcel',
    method: 'get',
    responseType: 'blob' // 解决乱码
  });
};
