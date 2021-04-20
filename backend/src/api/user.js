import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function mobileLogin(data) {
  return request({
    url: 'api/mobile/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function changePassword(params) {
  return request({
    url: '/api/user/changePassword',
    method: 'get',
    params
  })
}
