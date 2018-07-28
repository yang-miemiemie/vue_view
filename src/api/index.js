import http from './public'
// 区域列表
export const regionList = (params) => {
  return http.fetchGet('http://111.231.63.89:8771/lianjiaold/view/region_list', params)
}
// 小区列表
export const viliageList = (params) => {
  return http.fetchGet('http://111.231.63.89:8771/lianjiaold/view/viliage_list', params)
}

// 房屋列表
export const houseList = (page, size, params) => {
  return http.fetchGet('http://111.231.63.89:8771/lianjiaold/view/house_list/' + page + '-' + size, params)
}

// 月度统计
export const monthAnalysis = (params) => {
  return http.fetchGet('http://111.231.63.89:8771/lianjiaold/view/month_analysis', params)
}

