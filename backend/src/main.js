import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import moment from 'moment'
import config from '@/config'
import DivItem from '_c/DivItem'
import { plusXing } from '@/utils/tools'
import BaiduMap from 'vue-baidu-map'

import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
Vue.component('vue-ueditor-wrap', VueUeditorWrap)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'gyQMVYWDN5Le79YrA6Skni61E6ba2FaK'
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.component('div-item', DivItem)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$config = config
Vue.prototype.$plusXing = plusXing

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
