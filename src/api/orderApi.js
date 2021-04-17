import request from '@/utils/request'

export function getOrderList (data, shopId) {
  return request({
    url: `/v1/shops/${shopId}/order`,
    method: 'get',
    data
  })
}
