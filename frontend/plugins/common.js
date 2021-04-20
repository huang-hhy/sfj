import Vue from 'vue'
import moment from 'moment'
let common = {
  install (Vue) {
    Vue.prototype.$op = {
      'moment': (date) => {
        let newMoment = new moment(date)
        newMoment.locale('zh-cn')
        return newMoment
      }
    }
  }
}

Vue.use(common)
