import request from '@/utils/request'

// 获取回执数据列表接口   /web/receipt/list   GET请求  参数 meetingId  会议id
export function getMeetingFeedbackFrom(meetingId) {
  return request({
    url: '/api/web/receipt/list/?meetingId='+meetingId,
    method: 'get',
  })
}


// 查询会议列表
export function getMeetingList(params, data) {
  return request({
    url: '/api/meeting/meeting/list',
    method: 'post',
    params,
    data
  })
}

// 查询会议详情
export function getMeeting(id) {
  return request({
    url: '/api/meeting/meeting/' + id,
    method: 'get'
  })
}

// 新增会议
export function saveMeeting(data) {
  return request({
    url: '/api/meeting/meeting/add',
    method: 'post',
    data
  })
}

// 修改会议
export function updateMeeting(data) {
  return request({
    url: '/api/meeting/meeting/edit',
    method: 'post',
    data
  })
}

export function updateMeetingStatus(data) {
  return request({
    url: '/api/meeting/meeting/changeStatus',
    method: 'post',
    data
  })
}

// 删除会议
export function deleteMeeting(id) {
  return request({
    url: '/api/meeting/meeting/' + id,
    method: 'delete'
  })
}

// 批量签到接口
export function batchAttendRecord(data) {
  return request({
    url: '/api/meeting/meeting/batchAttendRecord',
    method: 'post',
    data
  })
}

// 批量未签到接口
export function batchUnAttendRecord(data) {
  return request({
    url: '/api/meeting/meeting/batchUnAttendRecord',
    method: 'post',
    data
  })
}

// 一键全部签到
export function attendAllRecord(data) {
  return request({
    url: '/api/meeting/meeting/attendAllRecord',
    method: 'post',
    data
  })
}

// 获取会议概况
export function getMeetingSurvey(data) {
  return request({
    url: '/api/meeting/meeting/statisticsMeeting',
    method: 'post',
    data
  })
}

// 获取会议纪要
export function getMeetingSummary(id) {
  return request({
    url: '/api/meeting/summary/' + id,
    method: 'get'
  })
}

export function saveMeetingSummary(data) {
  return request({
    url: '/api/meeting/summary/add',
    method: 'post',
    data
  })
}

export function updateMeetingSummary(data) {
  return request({
    url: '/api/meeting/summary/edit',
    method: 'post',
    data
  })
}

// 查询会议分类列表
export function getMeetingCateList(params, data) {
  return request({
    url: '/api/meeting/type/list',
    method: 'post',
    params,
    data
  })
}

// 查询会议分类详情
export function getMeetingCate(id) {
  return request({
    url: '/api/meeting/type/' + id,
    method: 'get'
  })
}

// 新增会议分类
export function saveMeetingCate(data) {
  return request({
    url: '/api/meeting/type/add',
    method: 'post',
    data
  })
}

// 修改会议
export function updateMeetingCate(data) {
  return request({
    url: '/api/meeting/type/edit',
    method: 'post',
    data
  })
}

export function updateMeetingCateStatus(data) {
  return request({
    url: '/api/meeting/type/changeStatus',
    method: 'post',
    data
  })
}

// 删除会议
export function deleteMeetingCate(id) {
  return request({
    url: '/api/meeting/type/' + id,
    method: 'delete'
  })
}

// 查询通知公告列表
export function getAfficheList(params, data) {
  return request({
    url: '/api/affiche/affiche/list',
    method: 'post',
    params,
    data
  })
}

// 查询通知公告详情
export function getAffiche(id) {
  return request({
    url: '/api/affiche/affiche/' + id,
    method: 'get'
  })
}

// 获取已读、未读
export function getAfficheLog(params) {
  return request({
    url: '/api/affiche/Log/list',
    method: 'get',
    params
  })
}

// 新增通知公告
export function saveAffiche(data) {
  return request({
    url: '/api/affiche/affiche/add',
    method: 'post',
    data
  })
}

// 修改通知公告
export function updateAffiche(data) {
  return request({
    url: '/api/affiche/affiche/edit',
    method: 'post',
    data
  })
}

// 删除通知公告
export function deleteAffiche(id) {
  return request({
    url: '/api/affiche/affiche/' + id,
    method: 'delete'
  })
}

// 查询积分规则列表
export function getScoreRuleList(params, data) {
  return request({
    url: '/api/score/rule/list',
    method: 'post',
    params,
    data
  })
}

// 查询积分规则详情
export function getScoreRule(id) {
  return request({
    url: '/api/score/rule/' + id,
    method: 'get'
  })
}

// 新增积分规则
export function saveScoreRule(data) {
  return request({
    url: '/api/score/rule/add',
    method: 'post',
    data
  })
}

// 修改积分规则
export function updateScoreRule(data) {
  return request({
    url: '/api/score/rule/edit',
    method: 'post',
    data
  })
}

// 删除积分规则
export function deleteScoreRule(id) {
  return request({
    url: '/api/score/rule/' + id,
    method: 'delete'
  })
}

// 奖惩管理
export function getRewardPunishmentList(params, data) {
  return request({
    url: '/api/reward/punishment/list',
    method: 'post',
    params,
    data
  })
}

export function getRewardPunishment(id) {
  return request({
    url: '/api/reward/punishment/' + id,
    method: 'get'
  })
}

export function saveRewardPunishment(data) {
  return request({
    url: '/api/reward/punishment/add',
    method: 'post',
    data
  })
}

export function updateRewardPunishment(data) {
  return request({
    url: '/api/reward/punishment/edit',
    method: 'post',
    data
  })
}

export function deleteRewardPunishment(id) {
  return request({
    url: '/api/reward/punishment/' + id,
    method: 'delete'
  })
}

// 贺卡管理
export function getGreetingCardsLogList(params) {
  return request({
    url: '/api/congratulation/log/list',
    method: 'get',
    params
  })
}

// 贺卡记录列表
export function getGreetingCardsCateList(params, data) {
  return request({
    url: '/api/congratulation/type/list',
    method: 'post',
    params,
    data
  })
}

export function getGreetingCardsCateSelect() {
  return request({
    url: '/api/congratulation/type/optionSelect',
    method: 'get'
  })
}

export function getGreetingCardsCate(id) {
  return request({
    url: '/api/congratulation/type/' + id,
    method: 'get'
  })
}

export function saveGreetingCardsCate(data) {
  return request({
    url: '/api/congratulation/type/add',
    method: 'post',
    data
  })
}

export function updateGreetingCardsCate(data) {
  return request({
    url: '/api/congratulation/type/edit',
    method: 'post',
    data
  })
}

export function deleteGreetingCardsCate(id) {
  return request({
    url: '/api/congratulation/type/' + id,
    method: 'delete'
  })
}

export function getGreetingCardsList(params, data) {
  return request({
    url: '/api/congratulation/cards/list',
    method: 'post',
    params,
    data
  })
}

export function getGreetingCards(id) {
  return request({
    url: '/api/congratulation/cards/' + id,
    method: 'get'
  })
}

export function saveGreetingCards(data) {
  return request({
    url: '/api/congratulation/cards/add',
    method: 'post',
    data
  })
}

export function updateGreetingCards(data) {
  return request({
    url: '/api/congratulation/cards/edit',
    method: 'post',
    data
  })
}

export function deleteGreetingCards(id) {
  return request({
    url: '/api/congratulation/cards/' + id,
    method: 'delete'
  })
}

// 民主测评管理
export function getDemocraticCateList(params, data) {
  return request({
    url: '/api/democratic/type/list',
    method: 'post',
    params,
    data
  })
}

export function getDemocraticCateSelect() {
  return request({
    url: '/api/democratic/type/optionSelect',
    method: 'get'
  })
}

export function getDemocraticCate(id) {
  return request({
    url: '/api/democratic/type/' + id,
    method: 'get'
  })
}

export function saveDemocraticCate(data) {
  return request({
    url: '/api/democratic/type/add',
    method: 'post',
    data
  })
}

export function updateDemocraticCate(data) {
  return request({
    url: '/api/democratic/type/edit',
    method: 'post',
    data
  })
}

export function deleteDemocraticCate(id) {
  return request({
    url: '/api/democratic/type/' + id,
    method: 'delete'
  })
}

// ---
export function getDemocraticList(params, data) {
  return request({
    url: '/api/democratic/appraisal/list',
    method: 'post',
    params,
    data
  })
}

export function getDemocratic(id) {
  return request({
    url: '/api/democratic/appraisal/' + id,
    method: 'get'
  })
}

export function saveDemocratic(data) {
  return request({
    url: '/api/democratic/appraisal/add',
    method: 'post',
    data
  })
}

export function updateDemocratic(data) {
  return request({
    url: '/api/democratic/appraisal/edit',
    method: 'post',
    data
  })
}

export function deleteDemocratic(id) {
  return request({
    url: '/api/democratic/appraisal/' + id,
    method: 'delete'
  })
}

export function getDemocraticTable(params) {
  return request({
    url: '/api/web/record/list',
    method: 'get',
    params
  })
}

// 组织荣誉
export function getOrganizationaHonorList(params, data) {
  return request({
    url: '/api/organizational/honor/list',
    method: 'post',
    params,
    data
  })
}

export function getOrganizationaHonor(id) {
  return request({
    url: '/api/organizational/honor/' + id,
    method: 'get'
  })
}

export function saveOrganizationaHonor(data) {
  return request({
    url: '/api/organizational/honor/add',
    method: 'post',
    data
  })
}

export function updateOrganizationaHonor(data) {
  return request({
    url: '/api/organizational/honor/edit',
    method: 'post',
    data
  })
}

export function deleteOrganizationaHonor(id) {
  return request({
    url: '/api/organizational/honor/' + id,
    method: 'delete'
  })
}

// 新增党费缴纳信息
export function savePartyFee(data) {
  return request({
    url: '/api/partyFee/pay/add',
    method: 'post',
    data
  })
}

// 党费缴纳列表
export function getPartyFeeList(params, data) {
  return request({
    url: '/api/partyFee/pay/list',
    method: 'post',
    params,
    data
  })
}

// 删除党费缴纳信息
export function deletePartyFee(id) {
  return request({
    url: '/api/partyFee/pay/' + id,
    method: 'delete'
  })
}

// 新增缴费人员信息接口
export function savePartyFeeRecord(data) {
  return request({
    url: '/api/partyFee/record/add',
    method: 'post',
    data
  })
}

// 批量确认缴纳接口
export function batchPartyFeeRecordConfirm(id) {
  return request({
    url: '/api/partyFee/record/confirm/' + id,
    method: 'get'
  })
}
//

// 导出缴费记录
export function exportPartyFeeRecord(id) {
  return request({
    url: '/api/partyFee/record/export?partyFeePayId=' + id,
    method: 'get'
  })
}

// 修改缴费人员信息接口
export function updatePartyFeeRecord(data) {
  return request({
    url: '/api/partyFee/record/edit',
    method: 'post',
    data
  })
}

// 查询缴费人员信息
export function getPartyFeeRecord(id) {
  return request({
    url: '/api/partyFee/record/' + id,
    method: 'get'
  })
}

// 查询缴费人员信息列表
export function getPartyFeeRecordList(params, data) {
  return request({
    url: '/api/partyFee/record/list',
    method: 'post',
    params,
    data
  })
}

// 统计当月未上传缴费记录的组织
export function getPartyFeeNoReadOrg(data) {
  return request({
    url: '/api/partyFee/pay/getNoReadOrg',
    method: 'post',
    data
  })
}

// 思想汇报管理
export function getThoughReportList(params, data) {
  return request({
    url: '/api/thought/report/list',
    method: 'post',
    params,
    data
  })
}

export function getThoughReport(id) {
  return request({
    url: '/api/thought/report/' + id,
    method: 'get'
  })
}

export function saveThoughReport(data) {
  return request({
    url: '/api/thought/report/add',
    method: 'post',
    data
  })
}

export function updateThoughReport(data) {
  return request({
    url: '/api/thought/report/edit',
    method: 'post',
    data
  })
}

export function deleteThoughReport(id) {
  return request({
    url: '/api/thought/report/' + id,
    method: 'delete'
  })
}

// 组织关系转接管理
export function getOrgRelationTransferList(params, data) {
  return request({
    url: '/api/relation/transfer/list',
    method: 'post',
    params,
    data
  })
}

export function getOrgRelationTransfer(id) {
  return request({
    url: '/api/relation/transfer/' + id,
    method: 'get'
  })
}

export function saveOrgRelationTransfer(data) {
  return request({
    url: '/api/relation/transfer/add',
    method: 'post',
    data
  })
}

export function updateOrgRelationTransfer(data) {
  return request({
    url: '/api/relation/transfer/edit',
    method: 'post',
    data
  })
}

export function deleteOrgRelationTransfer(id) {
  return request({
    url: '/api/relation/transfer/' + id,
    method: 'delete'
  })
}

// 流动党员管理
export function getFloatingPartyMembersList(params, data) {
  return request({
    url: '/api/floating/members/list',
    method: 'post',
    params,
    data
  })
}

export function getFloatingPartyMembers(id) {
  return request({
    url: '/api/floating/members/' + id,
    method: 'get'
  })
}

export function saveFloatingPartyMembers(data) {
  return request({
    url: '/api/floating/members/add',
    method: 'post',
    data
  })
}

export function updateFloatingPartyMembers(data) {
  return request({
    url: '/api/floating/members/edit',
    method: 'post',
    data
  })
}

export function deleteFloatingPartyMembers(id) {
  return request({
    url: '/api/floating/members/' + id,
    method: 'delete'
  })
}

// 留言管理 start
export function getLeaveMessageList(params, data) {
  return request({
    url: '/api/leave/message/list',
    method: 'post',
    params,
    data
  })
}

export function getLeaveMessage(id) {
  return request({
    url: '/api/leave/message/' + id,
    method: 'get'
  })
}

export function saveLeaveMessage(data) {
  return request({
    url: '/api/leave/message/add',
    method: 'post',
    data
  })
}

export function updateLeaveMessage(data) {
  return request({
    url: '/api/leave/message/edit',
    method: 'post',
    data
  })
}

export function deleteLeaveMessage(id) {
  return request({
    url: '/api/leave/message/' + id,
    method: 'delete'
  })
}

// 留言管理 end

// 发展党员 start

export function getStandardizationOptionSelect() {
  return request({
    url: '/api/standardization/template/optionSelect',
    method: 'get'
  })
}

export function getStandardizationStepList(params, data) {
  return request({
    url: '/api/standardization/step/list',
    method: 'post',
    params,
    data
  })
}

export function getStandardizationStep(id) {
  return request({
    url: '/api/standardization/step/' + id,
    method: 'get'
  })
}

export function saveStandardizationStep(data) {
  return request({
    url: '/api/standardization/step/add',
    method: 'post',
    data
  })
}

export function updateStandardizationStep(data) {
  return request({
    url: '/api/standardization/step/edit',
    method: 'post',
    data
  })
}

export function deleteStandardizationStep(ids) {
  return request({
    url: '/api/standardization/step/' + ids,
    method: 'delete'
  })
}

export function getStandardizationForm(id) {
  return request({
    url: '/api/standardization/form/' + id,
    method: 'get'
  })
}

// 删除发展党员
export function deleteStandardization(ids) {
  return request({
    url: '/api/standardization/standardization/' + ids,
    method: 'delete'
  })
}

// 新增发展党员自定义表单信息接口
export function saveStandardizationForm(data) {
  return request({
    url: '/api/standardization/form/add',
    method: 'post',
    data
  })
}

// 修改发展党员自定义表单信息接口
export function editStandardizationForm(data) {
  return request({
    url: '/api/standardization/form/edit',
    method: 'post',
    data
  })
}

// 新增发展党员申请信息接口
export function saveStandardization(data) {
  return request({
    url: '/api/standardization/standardization/add',
    method: 'post',
    data
  })
}

// 修改发展党员申请信息接口
export function editStandardization(data) {
  return request({
    url: '/api/standardization/standardization/edit',
    method: 'post',
    data
  })
}

// 查询发展党员流程第一个申请自定义表单模板
export function standardizationStepOne(params) {
  return request({
    url: '/api/standardization/step/one',
    method: 'get',
    params
  })
}

// 查询发展党员申请信息列表接口（分页）
export function standardizationList(data) {
  return request({
    url: '/api/standardization/standardization/list',
    method: 'post',
    data
  })
}

// 查询发展党员申请信息列表接口（分页）
export function standardizationFlow(data) {
  return request({
    url: '/api/standardization/flow/flow',
    method: 'post',
    data
  })
}

// 查询发展党员申请信息详情接口
export function getStandardizationDetail(id) {
  return request({
    url: '/api/standardization/standardization/' + id,
    method: 'get'
  })
}

// 查询发展党员所有流程节点信息接口
export function getStandardizationFlow(data) {
  return request({
    url: '/api/standardization/flow/flow',
    method: 'post',
    data
  })
}

// 查询发展党员标准化节点详情接口
export function getStandardizationFlowDetail(id) {
  return request({
    url: '/api/standardization/flow/' + id,
    method: 'get'
  })
}

// 修改发展党员标准化流程节点信息接口
export function editStandardizationFlow(data) {
  return request({
    url: '/api/standardization/flow/edit',
    method: 'post',
    data
  })
}

// 审核发展党员标准化信息接口
export function checkStandardization(data) {
  return request({
    url: '/api/standardization/standardization/check',
    method: 'post',
    data
  })
}

// 审核标准化流程节点信息接口
export function checkStandardizationFlow(data) {
  return request({
    url: '/api/standardization/flow/check',
    method: 'post',
    data
  })
}

// 发展党员 end

// 保存意见征集/党员互动
export function saveSolicitOpinions(data) {
  return request({
    url: '/api/solicitOpinions/save',
    method: 'post',
    data
  })
}

// 查询意见征集/党员互动（分页）
export function solicitOpinionsList(params, data) {
  return request({
    url: '/api/solicitOpinions/query',
    method: 'post',
    params,
    data
  })
}

// 根据id获取意见征集/党员互动详情
export function getSolicitOpinion(params) {
  return request({
    url: '/api/solicitOpinions/get',
    method: 'get',
    params
  })
}

// 根据id更新意见征集/党员互动
export function updateSolicitOpinion(data) {
  return request({
    url: '/api/solicitOpinions/update',
    method: 'post',
    data
  })
}

// 删除征集的意见
export function deleteRepository(params) {
  return request({
    url: '/api/solicitOpinions/deleteRepository',
    method: 'get',
    params
  })
}

// 删除意见征集/党员互动
export function deleteSolicitOpinions(params) {
  return request({
    url: '/api/solicitOpinions/delete',
    method: 'get',
    params
  })
}
