import axios from '@/plugins/api.request'

//一体机党务管理接口 /home/index/getMeeting GET 参数 distinguish 0代表会议 1代表活动
export const getPartyAdministration = (distinguish) => {
  return axios.request({
    url: 'api/home/index/getMeeting/?distinguish='+distinguish,
    method: 'get'
  })
}

//获取一体机活力党建下的组织架构
export const getOrganization = () => {
  return axios.request({
    url: 'api/home/index/getOrgTree ',
    method: 'get'
  })
}

// 模糊搜索文章接口
export const articleSearch = (data) => {
  return axios.request({
    url: 'api/home/index/article/search',
    method: 'post',
    data
  })
}

// 首页查询文章信息详情接口
export const getArticle = (id) => {
  return axios.request({
    url: 'api/home/index/article/' + id,
    method: 'get'
  })
}

// 查询热门文章接口
export const getHotArticle = () => {
  return axios.request({
    url: 'api/home/index/article/hot',
    method: 'get'
  })
}

// 根据频道ID查询文章列表接口（分页)
export const getArticleList = (params, data) => {
  return axios.request({
    url: 'api/home/index/article/list',
    method: 'post',
    params,
    data
  })
}

// 根据频道ID查询其以及下级频道列表接口（树结构）
export const getChannels = (id) => {
  return axios.request({
    url: 'api/home/index/channels/' + id,
    method: 'get'
  })
}

// 首页数据接口
export const getHomeData = () => {
  return axios.request({
    url: 'api/home/index/index',
    method: 'get'
  })
}

// 首页基本信息接口
export const getSetting = () => {
  return axios.request({
    url: 'api/home/index/system',
    method: 'get'
  })
}

// 一体机频道接口
export const getAllInOne = () => {
  return axios.request({
    url: 'api/home/index/getChannel',
    method: 'get'
  })
}

// 一体机频道接口2
export const getChannelList = () => {
  return axios.request({
    url: 'api/home/index/getStudy',
    method: 'get'
  })
}

// 按组织统计活动会议类型活动数量接口
export const statisticMeeting = (data) => {
  return axios.request({
    url: 'api/statistic/org/meeting',
    method: 'post',
    data
  })
}

// 按组织分类统计组织数量接口
export const statisticOrgList = () => {
  return axios.request({
    url: 'api/statistic/org/list',
    method: 'get'
  })
}

// 按组织统计用户信息接口
export const staticOrgUser = (data) => {
  return axios.request({
    url: 'api/statistic/org/user',
    method: 'post',
    data
  })
}

// 查询已考试卷信息列表接口（分页）
export const getExamListPast = (params, data) => {
  return axios.request({
    url: 'api/home/paper/listPast',
    method: 'post',
    params,
    data
  })
}

// 查询未考试卷信息列表接口（分页)
export const getExamListNow = (params, data) => {
  return axios.request({
    url:'api/home/paper/list',
    method: 'post',
    params,
    data
  })
}

// 查询答题信息列表接口（分页）
export const getAnswerList = (params, data) => {
  return axios.request({
    url:'api/home/answer/list',
    method: 'post',
    params,
    data
  })
}

// 新增答题信息接口
export const getAnswerSave = (data) => {
  return axios.request({
    url:'api/home/answer/save',
    method: 'post',
    data
  })
}

// 查询答卷信息详情接口
export const getAnswer = (id) => {
  return axios.request({
    url: 'api/home/answer/' + id,
    method: 'get'
  })
}

// 查询考试试卷信息详情接口
export const getPaper = (id) => {
  return axios.request({
    url: 'api/home/paper/' + id,
    method: 'get'
  })
}

// 查询所有课程分类信息列表接口
export const getStudyType = (data) => {
  return axios.request({
    url:'api/home/study/type',
    method: 'post',
    data
  })
}

// 查询学习课程信息列表接口（分页）
export const getStudyList = (data) => {
  return axios.request({
    url:'api/home/study/list',
    method: 'post',
    data
  })
}

// 查询学习课程信息详情接口
export const getStudy = (id) => {
  return axios.request({
    url: 'api/home/study/' + id,
    method: 'get'
  })
}

// 获取分享列表
export const getStudyShare = () => {
  return axios.request({
    url: 'api/home/getStudyShare',
    method: 'get'
  })
}

// 保存分享
export const saveStudyShare = (data) => {
  return axios.request({
    url: 'api/home/saveStudyShare',
    method: 'post',
    data
  })
}

// 新增学习记录信息接口
export const studySave = (data) => {
  return axios.request({
    url:'api/home/study/save',
    method: 'post',
    data
  })
}

// 查询在线学习支部打卡信息接口
export const branchRanking = (data) => {
  return axios.request({
    url:'api/home/study/branchRanking',
    method: 'post',
    data
  })
}

// 查询学习达人信息接口
export const getTalent = (data) => {
  return axios.request({
    url:'api/home/study/talent',
    method: 'post',
    data
  })
}

// 查询会议分类信息列表接口（分页）
export const getMeetingType = (params, data) => {
  return axios.request({
    url:'api/center/meeting/type',
    method: 'post',
    params,
    data
  })
}

// 查询会议活动信息列表接口（分页）
export const getMeetingList = (params, data) => {
  return axios.request({
    url:'api/center/meeting/list',
    method: 'post',
    params,
    data
  })
}

// 查询会议活动信息详情接口
export const getMeeting = (id) => {
  return axios.request({
    url: 'api/center/meeting/' + id,
    method: 'get'
  })
}

// 保存会议回执接口
export const saveMeetingReceipt = (data) => {
  return axios.request({
    url: 'api/center/meetingReceipt/save',
    method: 'post',
    data
  })
}

// 获取会议回执接口
export const getMeetingReceipt = (params) => {
  return axios.request({
    url: 'api/center/meetingReceipt/get',
    method: 'post',
    params
  })
}
// 会议活动签到或者请假接口
export const meetingAttend = (data) => {
  return axios.request({
    url:'api/center/meeting/attend',
    method: 'post',
    data
  })
}

// 会议活动出席或请假跟反馈接口
export const noticeCentreAttend = (data) => {
  return axios.request({
    url:'api/center/noticeCentre/attend',
    method: 'post',
    data
  })
}

// 查询关系转接信息列表接口（分页）
export const relationTransferList = (params, data) => {
  return axios.request({
    url:'api/home/relationTransfer/list',
    method: 'post',
    params,
    data
  })
}

// 新增关系转接信息接口
export const relationTransferSave = (data) => {
  return axios.request({
    url:'api/home/relationTransfer/save',
    method: 'post',
    data
  })
}


// 修改关系转接信息接口
export const relationTransferModify = (data) => {
  return axios.request({
    url:'api/home/relationTransfer/modify',
    method: 'post',
    data
  })
}

// 查询关系转接详情接口
export const getrelationTransfer = (id) => {
  return axios.request({
    url: 'api/home/relationTransfer/' + id,
    method: 'get'
  })
}
// 新增留言信息接口
export const leaveMessageSave = (data) => {
  return axios.request({
    url:'api/home/leaveMessage/save',
    method: 'post',
    data
  })
}

// 查询留言信息列表接口（分页)
export const leaveMessageList = (params, data) => {
  return axios.request({
    url:'api/home/leaveMessage/list',
    method: 'post',
    params,
    data
  })
}

// 点赞留言信息接口
export const leaveMessagePraise = (data) => {
  return axios.request({
    url:'api/home/leaveMessage/praise',
    method: 'post',
    data
  })
}
// 查询通知公告列表信息接口（分页）
export const afficheList = (params, data) => {
  return axios.request({
    url:'api/home/affiche/list',
    method: 'post',
    params,
    data
  })
}
// 查询通知公告详情接口
export const getAffiche = (id) => {
  return axios.request({
    url: 'api/home/affiche/' + id,
    method: 'get'
  })
}

// 调用此接口表示已读此公告
export const getAfficheLog = (data) => {
  return axios.request({
    url: 'api/home/afficheLog',
    method: 'post',
    data
  })
}

// 查询所有组织信息列表接口（需验证登录)
export const getOrgList = (data) => {
  return axios.request({
    url:'api/center/org/list',
    method: 'post',
    data
  })
}

// 查询待办事项信息列表接口（分页）
export const noticeCenterList = (params, data) => {
  return axios.request({
    url:'api/home/noticeCentre/list',
    method: 'post',
    params,
    data
  })
}


// 查询待办事项信息详情接口
export const getNoticeCenter = (id) => {
  return axios.request({
    url: 'api/home/noticeCentre/' + id,
    method: 'get'
  })
}

// 查询缴费缴纳信息接口
export const partyFeeRecordlist = (params, data) => {
  return axios.request({
    url:'api/home/partyFeeRecord/list',
    method: 'post',
    params,
    data
  })
}

// 查询所有贺卡类型信息列表接口
export const getcongratulationType = () => {
  return axios.request({
    url: 'api/home/congratulation/type',
    method: 'get'
  })
}

// 查询贺卡信息列表接口（分页）
export const congratulationCardslist = (params, data) => {
  return axios.request({
    url:'api/home/congratulationCards/list',
    method: 'post',
    params,
    data
  })
}

// 查询贺卡信息接口
export const getCongratulation = (params) => {
  return axios.request({
    url: 'api/home/getCongratulationCardLogList',
    method: 'get',
    params
  })
}

// 查询贺卡信息详情接口
export const getCongratulationCards = (id) => {
  return axios.request({
    url: 'api/home/congratulationCards/' + id,
    method: 'get'
  })
}

// 查询是否弹出贺卡
export const checkCongratulation = () => {
  return axios.request({
    url: 'api/home/checkCongratulation',
    method: 'get'
  })
}

// 查询个人积分记录列表接口（分页）
export const scoreRecordlist = (params, data) => {
  return axios.request({
    url:'api/home/scoreRecord/list',
    method: 'post',
    params,
    data
  })
}

// 查询个人积分记录详情接口
export const getScoreRecord = (id) => {
  return axios.request({
    url: 'api/home/scoreRecord/' + id,
    method: 'get'
  })
}


//查询发展党员流程第一个申请自定义表单模板
export const getjoiningFirst = () => {
  return axios.request({
    url: 'api/home/standardization/step/first' ,
    method: 'get'
  })
}

// 新增发展党员申请信息接口
export const standardizationSave = (data) => {
  return axios.request({
    url: 'api/home/standardization/standardization/save' ,
    method: 'post',
    data
  })
}

//查询发展党员所有流程节点信息接口
export const getpartyStandarizationFlow = (params) => {
  return axios.request({
    url: 'api/home/partyStandardization/flow',
    method: 'get',
    params
  })
}

// 查询所有组织信息列表接口（无需验证登录)
export const orgList = (data) => {
  return axios.request({
    url:'api/home/index/org/list',
    method: 'post',
    data
  })
}

// 查询发展党员标准化节点详情接口
export const partyFlowDetail = (id) => {
  return axios.request({
    url: 'api/home/partyStandardization/flow/' + id ,
    method: 'get'
  })
}

// 修改发展党员标准化流程节点信息接口
export const partyFlowSava = (data) => {
  return axios.request({
    url: 'api/home/partyStandardization/flow/save' ,
    method: 'post',
    data
  })
}

// 文件上传接口
export const uploadFile = (data) => {
  return axios.request({
    url: 'api/common/upload' ,
    method: 'post',
    data
  })
}

// 查看用户登录日志信息接口
export const loginRecord = (data) => {
  return axios.request({
    url: 'api/center/login/record' ,
    method: 'post',
    data
  })
}

// 获取意见征集/党员互动列表
export const getSolicitOpinions = (params) => {
  return axios.request({
    url: 'api/home/solicitOpinions/list',
    method: 'get',
    params
  })
}

// 获取意见征集/党员互动详情
export const getSolicitOpinionDetail = (id) => {
  return axios.request({
    url: '/api/home/solicitOpinions/get/' + id,
    method: 'get'
  })
}

// 保存意见征集/党员互动（评论）
export const saveSolicitOpinions = (data) => {
  return axios.request({
    url: 'api/home/solicitOpinions/save' ,
    method: 'post',
    data
  })
}

// 获取民主测评列表
export const getDemocraticAppraisalList = (params) => {
  return axios.request({
    url: '/api/home/democraticAppraisal/list',
    method: 'get',
    params
  })
}

// 获取参与民主测评列表
export const getDemocraticAppraisalRecordList = (params) => {
  return axios.request({
    url: '/api/home/democraticAppraisalRecord/list',
    method: 'get',
    params
  })
}

// 参与评测
export const saveDemocraticAppraisalRecord = (data) => {
  return axios.request({
    url: '/api/home/democraticAppraisalRecord/save',
    method: 'post',
    data
  })
}

// 查看用户信息列表接口（分页）
export const getUserList = (data) => {
  return axios.request({
    url: '/api/home/index/getUsers',
    method: 'post',
    data
  })
}

// 修改党员个人信息
export const updateUser =(data) => {
  return axios.request({
    url: '/api/home/updateUser',
    method: 'post',
    data
  })
}


// 获取工作指引类型
export function getGuideLinesType(params) {
  return axios.request({
    url: '/api/home/guidelinesType',
    method: 'get',
    params
  })
}

// 获取工作指引详情
export function getGuidelines(params) {
  return axios.request({
    url: '/api/home/guidelines',
    method: 'get',
    params
  })
}

// 不及格考试推送消息
export const getPersonalMessage =(data) => {
  return axios.request({
    url: '/api/home/getPersonalMessage',
    method: 'post',
    data
  })
}
