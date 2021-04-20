import { login, mobileLogin, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { encrypt } from '@/utils/tools'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  access: [],
  // access: ['equipment', 'equipment_manager', 'equipment_data_manager', 'warning', 'warning_manager', 'warning_type', 'task', 'dispatch', 'report', 'task_type', 'lock', 'permission_manager', 'log_manager', 'apply_manager', 'system', 'operate_log', 'data', 'permission', 'regional_classification', 'role_manager', 'user_manager', 'auth_manager'],
  orgId: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ORG_ID: (state, orgId) => {
    state.orgId = orgId
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ACCESS: (state, access) => {
    state.access = access
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginName: userName, password, loginIdentify: code, uuid, supplierId } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: encrypt(userName), password: encrypt(password), code, uuid, supplierId }).then(response => {
        if (response.code === 0) {
          const { data } = response
          commit('SET_TOKEN', data.token)
          resolve()
        } else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  mobileLogin({ commit }, userInfo) {
    const { mobile, code } = userInfo
    return new Promise((resolve, reject) => {
      mobileLogin({ mobile, code, type: 1 }).then(response => {
        if (response.code === 0) {
          const { data } = response
          commit('SET_TOKEN', data.token)
          resolve()
        } else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (res.code * 1 === 0) {
          // const access = ['equipment', 'equipment_manager', 'equipment_data_manager', 'warning', 'warning_manager', 'warning_type', 'task', 'dispatch', 'report', 'task_type', 'lock', 'permission_manager', 'log_manager', 'apply_manager', 'system', 'operate_log', 'data', 'permission', 'regional_classification', 'role_manager', 'user_manager', 'auth_manager']
          commit('SET_ROLES', res.data.roles)
          commit('SET_NAME', res.data.user.loginName)
          commit('SET_ORG_ID', res.data.user.orgId)
          commit('SET_ACCESS', res.data.permissions)
          commit('SET_AVATAR', '')
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', null)
      commit('SET_NAME', null)
      commit('SET_ORG_ID', null)
      commit('SET_AVATAR', null)
      removeToken()
      // 不能在这里resetRouter
      // resetRouter()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()
      //
      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      //   dispatch('tagsView/delAllViews', null, { root: true })
      //
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
