import request from '@/utils/request'

export function add (data) {
  return request({
    url: `/v1/cart/add`,
    method: 'post',
    data
  })
}

export function getCartByUserID (userId) {
  return request({
    url: `/v1/getCartByUserID/${userId}`,
    method: 'get'
  })
}

export function deleteSelect (data) {
  return request({
    url: `/v1/cart/deleteSelect`,
    method: 'delete',
    data
  })
}
