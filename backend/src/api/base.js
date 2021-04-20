import request from '@/utils/request'

export function captchaImage() {
  return request({
    url: 'api/captchaImage',
    method: 'get'
  })
}

export function getSupplierInfo() {
  return request({
    url: 'api/base/supplier/getSupplierInfo',
    method: 'get'
  })
}

export function upload() {
  return request({
    url: 'api/common/upload',
    method: 'post'
  })
}

export function download() {
  return request({
    url: 'api/common/download/resource',
    method: 'post'
  })
}

// 查询公告详情
export function getNotice(id) {
  return request({
    url: '/api/base/notice/' + id,
    method: 'get'
  })
}

// 查询公告列表
export function getNoticeList(data) {
  return request({
    url: '/api/base/notice/list',
    method: 'post',
    data
  })
}

// 新增公告
export function saveNotice(data) {
  return request({
    url: '/api/base/notice/add',
    method: 'post',
    data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/api/base/notice/edit',
    method: 'post',
    data
  })
}

// 删除公告
export function deleteNotice(id) {
  return request({
    url: '/api/base/notice/' + id,
    method: 'delete'
  })
}

export function getSensitiveWord(message) {
  return request({
    url: '/api/base/thesaurus/getSensitiveWordByToken',
    method: 'post',
    data: { message }
  })
}

export function getUsersByWhere(data) {
  return request({
    url: '/api/base/user/getUsers',
    method: 'post',
    data
  })
}

export function getCentreList(params, data) {
  return request({
    url: '/api/base/centre/list',
    method: 'post',
    params,
    data
  })
}

export function getCentre(id) {
  return request({
    url: '/api/base/centre/' + id,
    method: 'get'
  })
}

export function deleteCentre(id) {
  return request({
    url: '/api/base/centre/' + id,
    method: 'delete'
  })
}

export function getCentreListByRelationId(params, data) {
  return request({
    url: '/api/base/centre/getListByRelationId',
    method: 'post',
    params,
    data
  })
}

export function getSmsCode(data) {
  return request({
    url: '/api/tx/sms/send',
    method: 'post',
    data
  })
}

// 用户导出
export function exportUser(param) {
  return request({
    url: '/api/base/user/export',
    method: 'get',
    param
  })
}

export function exportOrg(param) {
  return request({
    url: '/api/base/org/export',
    method: 'get',
    param
  })
}

