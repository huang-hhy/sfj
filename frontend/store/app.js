import {getSetting} from '@/api/pc'
import config from '@/config'
import {login} from '@/api/common'
export const state = () => ({
  id: '',
  token: '',
  title: '',
  logo: '',
  copyright: '',
  address: '',
  menu: []
})

export const mutations = {
  SET_DATA(state, data) {
    for (let key in data) {
      if (state.hasOwnProperty(key)) {
        state[key] = data[key]
      }
    }
  },
  SET_TOKEN(state, data) {
    sessionStorage.setItem('token', data)
    state.token = data
  },
}

export const actions = {
  setApp({commit}, data) {
    commit('SET_DATA', data)
  },
  setBaseInfo({commit}) {
    getSetting().then(res => {
      if (res.code === 0) {
        let menu = [{id: '0', name: '首页', path: '/pc/home'}]
        let tmp = res.data.menus
        for (let i in tmp) {
          menu.push({id: tmp[i].id, name: tmp[i].articleChannelName, path: '/pc/news'})
        }
        menu.push({id: '1', name: '学习教育', path: '/pc/learningEducation'}, {id: '2', name: '党务管理', path: '/pc/partyManagement'}, {id: '3', name: '留言箱', path: '/pc/bbs'}, {id: '4', name: '活力党建', path: '/pc/vitalityParty'}, {id: '0', name: '个人中心', path: '/pc/profile'})
        // menu.push({id: '0', name: '个人中心', path: '/pc/profile'})
        let token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
        let logo = res.data.supplier.topLogo ? config.attachUrl + res.data.supplier.topLogo : ''
        commit('SET_DATA', {menu: menu, title: res.data.supplier.supplierName, id: res.data.supplier.id, token, logo: logo, copyright: res.data.supplier.copyright })
      }
    })
  }
}
