// 白名单 过滤token 不需携带tooken的接口在此添加一份
const whiteList = [
  'api/login',
  'api/captchaImage',
  'api/home/index/system',
  'api/home/index/index',
  '/api/home/index/article',
  'api/home/index/article/list',
  'api/home/index/article/hot',
  // 'api/home/study/list',
  'api/home/index/channels',
  'api/base/thesaurus/getSensitiveWord',
  '/api/home/index/getUsers',
  'api/home/index/app',
  'api/home/index/org/list',
  'api/home/index/article',
  'api/home/index/getChannel',
  'api/home/index/getStudy',
  'api/home/index/getMeeting',
]
export default whiteList
