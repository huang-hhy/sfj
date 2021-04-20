import request from '@/utils/request'

// 日志列表查询
export function querySysLog(params) {
  return request({
    url: '/api/sysLog/query',
    method: 'get',
    params
  })
}

export function getMachineCode(params) {
  return request({
    url: '/api/CrtBasicService/getMachineCode',
    method: 'get'
  })
}

