import {getUserCenter} from '@/api/common'

export const state = () => ({
  id: '',
  loginName: '',
  avatar: '',
  phone: '',
  email: '',
  orgId: '',
  orgName: '',
  userName: '',
  sex: '',
  userTypeId:'',
  userTypeName:'',
  usersInfo: '',
  studyNum: '',
  score: ''
})
export const mutations = {
  SET_DATA(state, data) {
    for (let key in data) {
      if (state.hasOwnProperty(key)) {
        state[key] = data[key]
      }
    }
  }
}

export const actions = {
  setUserCenter({commit}) {
    getUserCenter().then(res => {
      if (res.code === 0) {
        let user = res.data.user
        user.studyNum = res.data.studyNum
        user.score =  user.usersInfo.score
        commit('SET_DATA', user)
      }
    })
  }
}
