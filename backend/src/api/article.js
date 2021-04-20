import request from '@/utils/request'

// 查询文章信息列表
export function getArticleList(params, data) {
  return request({
    url: '/api/article/article/list',
    method: 'post',
    params,
    data
  })
}

// 查询文章信息详情
export function getArticle(id) {
  return request({
    url: '/api/article/article/' + id,
    method: 'get'
  })
}

// 新增文章信息
export function saveArticle(data) {
  return request({
    url: '/api/article/article/add',
    method: 'post',
    data
  })
}

// 修改文章信息
export function updateArticle(data) {
  return request({
    url: '/api/article/article/edit',
    method: 'post',
    data
  })
}

// 删除文章信息
export function deleteArticle(id) {
  return request({
    url: '/api/article/article/' + id,
    method: 'delete'
  })
}

// 文章信息审批
export function checkArticle(data) {
  return request({
    url: '/api/article/article/check',
    method: 'post',
    data
  })
}

// 文章信息提交审批
export function submitArticle(data) {
  return request({
    url: '/api/article/article/submit',
    method: 'post',
    data
  })
}

// 文章信息发布
export function publishArticle(data) {
  return request({
    url: '/api/article/article/submit',
    method: 'post',
    data
  })
}

// 文章信息下架
export function downArticle(data) {
  return request({
    url: '/api/article/article/down',
    method: 'post',
    data
  })
}

// 文章信息发布
export function articlePulish(data) {
  return request({
    url: '/api/article/article/publish',
    method: 'post',
    data
  })
}

// 查询文章频道信息列表（分页）
export function getArticleCateList(params, data) {
  return request({
    url: '/api/article/channel/list',
    method: 'post',
    params,
    data
  })
}

// 查询文章频道信息列表（树结构）
export function getArticleCateListTree(data) {
  return request({
    url: '/api/article/channel/treeSelect',
    method: 'post',
    data
  })
}

// 查询文章频道信息详情
export function getArticleCate(id) {
  return request({
    url: '/api/article/channel/' + id,
    method: 'get'
  })
}

// 新增文章频道信息
export function saveArticleCate(data) {
  return request({
    url: '/api/article/channel/add',
    method: 'post',
    data
  })
}

// 修改文章频道信息
export function updateArticleCate(data) {
  return request({
    url: '/api/article/channel/edit',
    method: 'post',
    data
  })
}

// 删除文章频道信息
export function deleteArticleCate(id) {
  return request({
    url: '/api/article/channel/' + id,
    method: 'delete'
  })
}
// 新增轮播图信息
export function saveRotation(data) {
  return request({
    url: '/api/article/rotation/add',
    method: 'post',
    data
  })
}

// 修改轮播图信息
export function updateRotation(data) {
  return request({
    url: '/api/article/rotation/edit',
    method: 'post',
    data
  })
}

// 删除轮播图信息 (支持批量)
export function deleteRotation(id) {
  return request({
    url: '/api/article/rotation/' + id,
    method: 'delete'
  })
}

// 查询轮播图信息详情
export function getRotation(id) {
  return request({
    url: '/api/article/rotation/' + id,
    method: 'get'
  })
}

// 查询轮播图信息列表
export function getRotationList(data) {
  return request({
    url: '/api/article/rotation/list',
    method: 'post',
    data
  })
}
