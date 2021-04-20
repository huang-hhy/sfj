import axios from '@/plugins/api.request'

// 获取用户信息接口
export function getInfo() {
  return axios.request({
    url: 'api/getInfo',
    method: 'get'
  })
}

export function login(data) {
  return axios.request({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function captchaImage() {
  return axios.request({
    url: 'api/captchaImage',
    method: 'get'
  })
}

export function getUserCenter() {
  return axios.request({
    url: 'api/getUserCenter',
    method: 'get'
  })
}

export function getSensitiveWord(message) {
  return axios.request({
    url: 'api/base/thesaurus/getSensitiveWord',
    method: 'post',
    data: { message }
  })
}
