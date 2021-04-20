import request from '@/utils/request'

// 后台试卷相关的新增页面页面，党内职务列表内容，改成/base/userType/selectList  post 请求  返回的内容
export function getPartyPosts() {
  return request({
    url: '/api/base/userType/selectList',
    method: 'post',
    
  })
}

// 根据类型查询类型集合
export function getBankList(data) {
  return request({
    url: '/api/paper/bank/getBankList',
    method: 'post',
    data
  })
}

// 查询合格/不合格列表
export function getAnswerList(params, data) {
  return request({
    url: '/api/paper/answer/list',
    method: 'post',
    params,
    data
  })
}

// 发送信息至不合格
export function personalMessage(data) {
  return request({
    url: '/api/personalMessage/add',
    method: 'post',
    data
  })
}

// 统计调查问卷接口
export function getAnswerStatistics(params) {
  return request({
    url: 'api/paper/paper/statistic/paper',
    method: 'get',
    params
  })
}

// 查询问题列表
export function getQuestionList(params, data) {
  return request({
    url: '/api/paper/bank/list',
    method: 'post',
    params,
    data
  })
}

// 查询问题详情
export function getQuestion(id) {
  return request({
    url: '/api/paper/bank/' + id,
    method: 'get'
  })
}

// 新增问题
export function saveQuestion(data) {
  return request({
    url: '/api/paper/bank/add',
    method: 'post',
    data
  })
}

// 修改问题
export function updateQuestion(data) {
  return request({
    url: '/api/paper/bank/edit',
    method: 'post',
    data
  })
}

export function updateQuestionStatus(data) {
  return request({
    url: '/api/paper/bank/changeStatus',
    method: 'post',
    data
  })
}

// 删除问题
export function deleteQuestion(id) {
  return request({
    url: '/api/paper/bank/' + id,
    method: 'delete'
  })
}

// 查询试卷列表
export function getExamList(params, data) {
  return request({
    url: '/api/paper/paper/list',
    method: 'post',
    params,
    data
  })
}

export function getExamOptionSelect() {
  return request({
    url: '/api/paper/type/optionSelect',
    method: 'get'
  })
}

export function getExamRandomQuestion(data) {
  return request({
    url: '/api/paper/paper/randomCreate',
    method: 'post',
    data
  })
}

export function getQuestionClassification(params) {
  return request({
    url: '/api/paper/bank/getBankClassificationName',
    method: 'get',
    params
  })
}

// 查询试卷详情
export function getExam(id) {
  return request({
    url: '/api/paper/paper/' + id,
    method: 'get'
  })
}

// 新增试卷
export function saveExam(data) {
  return request({
    url: '/api/paper/paper/add',
    method: 'post',
    data
  })
}

// 修改试卷
export function updateExam(data) {
  return request({
    url: '/api/paper/paper/edit',
    method: 'post',
    data
  })
}

export function updateExamStatus(data) {
  return request({
    url: '/api/paper/paper/changeStatus',
    method: 'post',
    data
  })
}

// 删除试卷
export function deleteExam(id) {
  return request({
    url: '/api/paper/paper/' + id,
    method: 'delete'
  })
}

// 查询课程列表
export function getLessonList(params, data) {
  return request({
    url: '/api/study/course/list',
    method: 'post',
    params,
    data
  })
}

// 查询课程详情
export function getLesson(id) {
  return request({
    url: '/api/study/course/' + id,
    method: 'get'
  })
}

// 新增课程
export function saveLesson(data) {
  return request({
    url: '/api/study/course/add',
    method: 'post',
    data
  })
}

// 修改课程
export function updateLesson(data) {
  return request({
    url: '/api/study/course/edit',
    method: 'post',
    data
  })
}

export function updateLessonStatus(data) {
  return request({
    url: '/api/study/course/changeStatus',
    method: 'post',
    data
  })
}

// 删除课程
export function deleteLesson(id) {
  return request({
    url: '/api/study/course/' + id,
    method: 'delete'
  })
}

// 查询课程分类列表
export function getLessonCateList(params, data) {
  return request({
    url: '/api/study/type/list',
    method: 'post',
    params,
    data
  })
}

export function getLessonCateSelect() {
  return request({
    url: '/api/study/type/optionSelect',
    method: 'get'
  })
}

// 查询课程分类详情
export function getLessonCate(id) {
  return request({
    url: '/api/study/type/' + id,
    method: 'get'
  })
}

// 新增课程分类
export function saveLessonCate(data) {
  return request({
    url: '/api/study/type/add',
    method: 'post',
    data
  })
}

// 修改课程分类
export function updateLessonCate(data) {
  return request({
    url: '/api/study/type/edit',
    method: 'post',
    data
  })
}

export function updateLessonCateStatus(data) {
  return request({
    url: '/api/study/type/changeStatus',
    method: 'post',
    data
  })
}

// 删除课程分类
export function deleteLessonCate(id) {
  return request({
    url: '/api/study/type/' + id,
    method: 'delete'
  })
}

/*
* 工作指引分类start
* */

// 查询课程分类列表
export function guidelinesTypeList(params, data) {
  return request({
    url: '/api/guidelinesType/list',
    method: 'post',
    params,
    data
  })
}

// 添加分类
export function guidelinesTypeAdd(data) {
  return request({
    url: '/api/guidelinesType/add',
    method: 'post',
    data
  })
}

// 更新分类
export function guidelinesTypeUpdate(data) {
  return request({
    url: '/api/guidelinesType/edit',
    method: 'post',
    data
  })
}

// 查询分类详情
export function getGuidelinesType(id) {
  return request({
    url: '/api/guidelinesType/' + id,
    method: 'get'
  })
}

// 删除分类
export function deleteGuidelinesType(id) {
  return request({
    url: '/api/guidelinesType/' + id,
    method: 'delete'
  })
}

export function guidelinesList(data) {
  return request({
    url: '/api/guidelines/list',
    method: 'post',
    data
  })
}

export function guidelinesAdd(data) {
  return request({
    url: '/api/guidelines/add',
    method: 'post',
    data
  })
}

export function guidelinesEdit(data) {
  return request({
    url: '/api/guidelines/edit',
    method: 'post',
    data
  })
}

//
export function deleteGuidelines(id) {
  return request({
    url: '/api/guidelines/' + id,
    method: 'delete'
  })
}

//
export function getGuidelines(id) {
  return request({
    url: '/api/guidelines/' + id,
    method: 'get'
  })
}

/*
* 工作指引分类end
* */
