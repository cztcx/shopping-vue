import request from '@/utils/request'

export function getOrderList (data, shopId) {
  return request({
    url: `/v1/shops/${shopId}/order`,
    method: 'get',
    data
  })
}
export function add (data) {
  return request({
    url: `/v1/user/payFinish`,
    method: 'post',
    data
  })
}
export function getUserOrders (userId) {
  return request({
    url: `/v1/user/getOrders/${userId}`,
    method: 'get'
  })
}
