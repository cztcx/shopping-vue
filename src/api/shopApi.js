import request from '@/utils/request'

export function getShopByUserId (userId) {
  return request({
    url: `/v1/shops/${userId}/shop`,
    method: 'get'
  })
}

export function getGoodsByShopID (shopId) {
  return request({
    url: `/v1/goodsUpByShopID/${shopId}`,
    method: 'get'
  })
}

export function getGoodsDownByShopID (shopId) {
  return request({
    url: `/v1/goodsDownByShopID/${shopId}`,
    method: 'get'
  })
}

export function GoodsDown (goodsId) {
  return request({
    url: `/v1/goodsDown/${goodsId}`,
    method: 'put'
  })
}

export function GoodsUp (goodsId) {
  return request({
    url: `/v1/goodsUp/${goodsId}`,
    method: 'put'
  })
}
