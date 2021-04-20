import request from '@/utils/request'

// 查询问题列表
export function getStatisticOrgUsers(data) {
  return request({
    url: '/api/statistic/org/user',
    method: 'post',
    data
  })
}

// 按组织分类统计组织数量接口
export function getStatisticOrgs() {
  return request({
    url: '/api/statistic/org/list',
    method: 'get'
  })
}
// 按组织分类统计组织数量接口
export function statisticMeeting(data) {
  return request({
    url: '/api/meeting/meeting/statistic/meeting',
    method: 'post',
    data
  })
}
