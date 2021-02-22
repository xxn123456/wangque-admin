import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import querystring from 'querystring'

const state = {
  userId: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  nikeName: '用户名称',
  userPic: '',
  layout: null
}

const mutations = {

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, msg) => {
    state.userId = msg
  },
  SET_LAYOUT: (state, data) => {
    state.layout = data
  },
  SET_NICKNAME: (state, data) => {
    state.nikeName = data
  },
  SET_USERPIC: (state, data) => {
    state.userPic = data
  }

}

const actions = {
  // login/login.vue 执行逻辑
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 将json 字符串转化为x-from
      const user = querystring.stringify({ userName: username.trim(), password: password })

      console.log(user)

      login(user).then(response => {
      
        if (response.code == 0) {
          const { token } = response;
          // 将token放到vuex
          commit('SET_TOKEN', token);
          // 储存token到本地
          localStorage.setItem('id', token);
          // 储存token 到cookie
          setToken(token)
        }

        resolve()
      }).catch(error => {
        
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { respData } = response

        if (!respData) {
          reject('认证失败，请重新登录')
        }

        const { roles, name, avatar, introduction, nikeName, userPic } = respData

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        // 获取用户简介
        commit('SET_INTRODUCTION', introduction)
        // 获取用户信息
        commit('SET_NICKNAME', nikeName)
        // 获取用户图片

        commit('SET_USERPIC', userPic)

        localStorage.setItem('menu', JSON.stringify(respData))

        resolve(respData)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    // 情况登录信息
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
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
  },
  setLayout({ commit }, layout) {
    commit('SET_LAYOUT', layout)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
