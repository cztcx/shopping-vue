import request from '@/utils/request'

export function getOrderHistoryList (data, shopId) {
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
export function getUserHistoryOrders (userId) {
  return request({
    url: `/v1/user/getHistoryOrders/${userId}`,
    method: 'get'
  })
}

export function deleteHistoryOrder (orderHistoryId) {
  return request({
    url: `/v1/user/deleteHisOrder/${orderHistoryId}`,
    method: 'delete'
  })
}
