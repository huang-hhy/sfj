import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/libs/util'
import { checkWhiteList } from '@/libs/tools'
import whiteList from '@/config/whiteList'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig (url) {
    let token = sessionStorage.getItem('token') || ''
    if(checkWhiteList(whiteList, url)) {
      token = ''
    }
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization: token
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // const { data, status } = res
      // return { data, status }
      const { data } = res
      if (typeof data === "object") {
        if (data.code !== 1) {
          if (data.code === 405) {
            // store.commit('setToken', '')
            // location.replace('/login')
            redirect('/login')
          }else if( data.code *1 === 14){
              location.replace('/notfound')
          }
          // else {
          //   location.replace('/500')
          // }
        }
      }
      return data
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
        console.log(errorInfo)
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(options.url), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
