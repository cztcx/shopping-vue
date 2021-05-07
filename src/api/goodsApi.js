import request from '@/utils/request'

export function create (data) {
  return request({
    url: `/v1/shop/goods`,
    method: 'post',
    data
  })
}
export function getGoodsByCID (categoryId) {
  return request({
    url: `/v1/goodsByCateID/${categoryId}`,
    method: 'get'
  })
}
export function getGoodsByID (goodsId) {
  return request({
    url: `/v1/goodsByGoodsID/${goodsId}`,
    method: 'get'
  })
}
