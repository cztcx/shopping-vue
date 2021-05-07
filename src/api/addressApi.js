import request from '@/utils/request'

export function create (data) {
  return request({
    url: `/v1/address/add`,
    method: 'post',
    data
  })
}
export function getAll (userId) {
  return request({
    url: `/v1/user/getAddress/${userId}`,
    method: 'get'
  })
}
export function retrieve (addressId) {
  return request({
    url: `/v1/user/getOneAddress/${addressId}`,
    method: 'get'
  })
}

export function update (data) {
  return request({
    url: `/v1/address/update`,
    method: 'put',
    data: data
  })
}

export function Delete (addressId) {
  return request({
    url: `/v1/user/deleteAddress/${addressId}`,
    method: 'delete'
  })
}
