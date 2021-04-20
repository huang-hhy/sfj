import request from '@/utils/request'
/*
* 党性体检项目start
* */

// 查询党性体检项目列表
export function partySpiritClassificationQuery(data) {
  return request({
    url: '/api/partySpiritClassification/query',
    method: 'post',
    data
  })
}

// 添加党性体检项目
export function partySpiritClassificationSave(data) {
  return request({
    url: '/api/partySpiritClassification/save',
    method: 'post',
    data
  })
}

// 修改党性体检项目
export function partySpiritClassificationUpdate(data) {
  return request({
    url: '/api/partySpiritClassification/update',
    method: 'post',
    data
  })
}

// 获取党性体检项目
export function partySpiritClassificationGet(id) {
  return request({
    url: '/api/partySpiritClassification/get?id=' + id,
    method: 'get'
  })
}

// 删除党性体检项目
export function partySpiritClassificationDelete(id) {
  return request({
    url: '/api/partySpiritClassification/delete?ids=' + id,
    method: 'get'
  })
}

/*
* 党性体检项目end
* */

/*
* 党性体检模板与发布
* */

// 查询党性体检列表
export function partySpiritQueryManage(data) {
  return request({
    url: '/api/partySpirit/queryManage',
    method: 'post',
    data
  })
}
// 查询党性体检模板列表
export function partySpiritQueryTemplate(data) {
  return request({
    url: '/api/partySpirit/queryTemplate',
    method: 'post',
    data
  })
}

// 查询党性体检模板列表
export function partySpiritGetTemplateById(id) {
  return request({
    url: '/api/partySpirit/getTemplateById?id=' + id,
    method: 'get'
  })
}

// 删除党性体检模板
export function partySpiritDeleteTemplate(id) {
  return request({
    url: '/api/partySpirit/deleteTemplate?id=' + id,
    method: 'get'
  })
}

// 删除党性体检题目
export function partySpiritDeleteSubject(id) {
  return request({
    url: '/api/partySpirit/deleteSubject?id=' + id,
    method: 'get'
  })
}

// 删除党性体检答案
export function partySpiritDeleteAnswer(id) {
  return request({
    url: '/api/partySpirit/deleteAnswer?id=' + id,
    method: 'get'
  })
}

// 保存党性体检模板
export function partySpiritSaveTemplate(data) {
  return request({
    url: '/api/partySpirit/saveTemplate',
    method: 'post',
    data
  })
}
// 更新党性体检模板
export function partySpiritUpdateTemplate(data) {
  return request({
    url: '/api/partySpirit/updateTemplate',
    method: 'post',
    data
  })
}

// 发布党性体检
export function partySpiritRelease(data) {
  return request({
    url: '/api/partySpirit/release',
    method: 'post',
    data
  })
}

// 用户体检分页
export function partySpiritQueryResult(data) {
  return request({
    url: '/api/partySpiritResult/queryResult',
    method: 'post',
    data
  })
}

// 用户体检自检
export function partySpiritSelfUserResult(data) {
  return request({
    url: '/api/partySpiritResult/selfUserResult',
    method: 'post',
    data
  })
}

// 审定用户体检
export function partySpiritApprovalUserResult(data) {
  return request({
    url: '/api/partySpiritResult/approvalUserResult',
    method: 'post',
    data
  })
}

// 删除用户体检
export function partySpiritDeleteResultById(id) {
  return request({
    url: '/api/partySpiritResult/deleteResultById?id=' + id,
    method: 'get'
  })
}

// 根据id用户获取体检详情
export function partySpiritGetResultById(id) {
  return request({
    url: '/api/partySpiritResult/getResultById?id=' + id,
    method: 'get'
  })
}

// 撤回用户体检
export function partySpiritRevokeResultById(id) {
  return request({
    url: '/api/partySpiritResult/revokeResultById?id=' + id,
    method: 'get'
  })
}

// 用户个人撤回
export function partySpiritRevokeUserResultById(id) {
  return request({
    url: '/api/partySpiritResult/revokeUserResultById?id=' + id,
    method: 'get'
  })
}
