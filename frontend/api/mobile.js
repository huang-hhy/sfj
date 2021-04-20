import axios from '@/plugins/api.request'

// 查询所有组织信息列表接口
export const orgList = (data) => {
  return axios.request({
    url: 'api/app/center/org/list',
    method: 'post',
    data
  })
}

// 点赞留言信息接口
export const leaveMessagePraise = (data) => {
  return axios.request({
    url: 'api/app/leaveMessage/praise',
    method: 'post',
    data
  })
}

// 查询留言信息列表接口（分页）
export const leaveMessageList = (data) => {
  return axios.request({
    url: 'api/app/leaveMessage/list',
    method: 'post',
    data
  })
}

// 查询会议活动信息列表接口（分页）
export const meetingList = (data) => {
  return axios.request({
    url: 'api/app/center/meeting/list',
    method: 'post',
    data
  })
}

// 查询所有组织信息列表接口
export const meetingType = (data) => {
  return axios.request({
    url: 'api/app/center/meeting/type',
    method: 'post',
    data
  })
}

// 查询最新学习课程信息列表接口（分页）
export const studyNew = (data) => {
  return axios.request({
    url: 'api/app/study/new',
    method: 'post',
    data
  })
}

// 查询所有课程分类信息列表接口
export const studyType = (data) => {
  return axios.request({
    url: 'api/app/study/type',
    method: 'post',
    data
  })
}

//查询学习课程信息列表接口（分页）
export const studyList = (data) => {
  return axios.request({
    url: 'api/app/study/list',
    method: 'post',
    data
  })
}

// 查询学习课程信息详情接口
export const getStudyDetail = (id) => {
  return axios.request({
    url: 'api/app/study/' + id,
    method: 'get',
  })
}

export const getSetting = () => {
  return axios.request({
    url: 'api/pc/index/system',
    method: 'get'
  })
}
export const getHomeData = () => {
  return axios.request({
    url: 'api/home/index/app',
    method: 'get'
  })
}
//文件下载
export const getDownload = () => {
  return axios.request({
    url: 'api/common/download/resource',
    method: 'get'
  })
}
//图片回显
export const getImg = () => {
  return axios.request({
    url: 'api/common/download/show',
    method: 'get'
  })
}
// 学习分类接口
export const getStudyType = (data) => {
  return axios.request({
    url: 'api/app/study/type',
    method: 'post',
    data
  })
}
//查询学习课程信息列表接口（分页）
export const getCourseList = (data) => {
  return axios.request({
    url: 'api/app/study/list',
    method: 'post',
    data
  })
}
//查询学习课程信息详情接口
export const getCourseDetail = (id) => {
  return axios.request({
    url: 'api/app/study/' + id,
    method: 'get',
  })
}
//查询未考试卷信息列表
export const getExamList = (data) => {
  return axios.request({
    url: 'api/app/paper/list',
    method: 'post',
    data
  })
}
//查询已考试卷信息列表
export const getExamListPast = (data) => {
  return axios.request({
    url: 'api/app/paper/listPast',
    method: 'post',
    data
  })
}
//查询考试试卷信息详情
export const getExamDetail = (id) => {
  return axios.request({
    url: 'api/app/paper/' + id,
    method: 'get',
  })
}
//新增答题信息
export const setAnswer = (data) => {
  return axios.request({
    url: 'api/app/answer/save',
    method: 'post',
    data
  })
}
//查询答题信息列表接口（分页）
export const getAnswerList = (data) => {
  return axios.request({
    url: 'api/app/answer/list',
    method: 'post',
    data
  })
}
//查询答卷信息详情
export const getAnswer = (id) => {
  return axios.request({
    url: 'api/app/answer/'+id,
    method: 'get',
  })
}
//查询通知公告列表
export const getNoticeList = (data) => {
  return axios.request({
    url: 'api/app/affiche/list',
    method: 'post',
    data
  })
}
//查询通知公告详情
export const getNoticeDetail = (id) => {
  return axios.request({
    url: 'api/app/affiche/'+id,
    method: 'get',
  })
}
//查询关系转接信息列表
export const getRelationList = (data) => {
  return axios.request({
    url: 'api/app/relationTransfer/list',
    method: 'post',
    data
  })
}
//查询关系转接详情
export const getRelationDetail = (id) => {
  return axios.request({
    url: 'api/app/relationTransfer/'+id,
    method: 'get',
  })
}
//新增关系转接信息
export const setRelation = (data) => {
  return axios.request({
    url: 'api/app/relationTransfer/save',
    method: 'post',
    data
  })
}
//修改关系转接信息
export const modifyRelation = (data) => {
  return axios.request({
    url: 'api/app/relationTransfer/modify',
    method: 'post',
    data
  })
}
//查询留言信息列表接口（分页）
export const getMessageList = (data) => {
  return axios.request({
    url: 'api/app/leaveMessage/list',
    method: 'post',
    data
  })
}
//新增留言信息接口
export const setMessage = (data) => {
  return axios.request({
    url: 'api/app/leaveMessage/save',
    method: 'post',
    data
  })
}
//查询个人积分排行榜信息
export const getRank = () => {
  return axios.request({
    url: 'api/app/center/score/rank',
    method: 'get'
  })
}
//查询会议分类信息列表
export const getMeetingType = (data) => {
  return axios.request({
    url: 'api/app/center/meeting/type',
    method: 'post',
    data
  })
}
//查询会议活动信息列表
export const getMeetingList = (data) => {
  return axios.request({
    url: 'api/app/center/meeting/list',
    method: 'post',
    data
  })
}
//查询会议活动信息详情
export const getMeetingDetail = (id) => {
  return axios.request({
    url: 'api/app/center/meeting/'+id,
    method: 'get',
  })
}
//会议活动签到或者请假
export const setActivityLeave = (data) => {
  return axios.request({
    url: 'api/app/center/meeting/attend',
    method: 'post',
    data
  })
}
//会议活动出席或请假跟反馈
export const setMeetingLeave = (data) => {
  return axios.request({
    url: 'api/app/center/noticeCentre/attend',
    method: 'post',
    data
  })
}
//查询所有组织信息列表
export const getOrgList = (data) => {
  return axios.request({
    url: 'api/app/center/org/list',
    method: 'post',
    data
  })
}

