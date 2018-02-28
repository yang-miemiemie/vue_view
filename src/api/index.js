import http from './public'
// 区域列表
export const regions = (params) => {
  return http.fetchGet('http://47.100.6.84/cloud/fang/lianjia_old/region', params)
}
// 小区列表
export const viliages = (params) => {
  return http.fetchGet('http://47.100.6.84/cloud/fang/lianjia_old/viliage', params)
}
// 二手房列表
export const list = (page, size, params) => {
  return http.fetchGet('http://47.100.6.84/cloud/fang/lianjia_old/list-' + page + '-' + size, params)
}

