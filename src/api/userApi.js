import request from '@/utils/request'

export function userLogin (data) {
  return request({
    url: '/v1/userLogin',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout () {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function UserUpdate (data) {
  return request({
    url: `/v1/users/update`,
    method: 'put',
    data: data
  })
}

export function retrieve (userId) {
  return request({
    url: `/v1/users/${userId}`,
    method: 'get'
  })
}
