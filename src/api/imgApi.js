import request from '@/utils/request'

export function add (data) {
  return request({
    url: `/v1/goods/addImg`,
    method: 'post',
    data
  })
}
export function deleteImg (filename) {
  return request({
    url: `/v1/goods/deleteImg/${filename}`,
    method: 'delete'
  })
}
