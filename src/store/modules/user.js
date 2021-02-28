import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import querystring from 'querystring'

const state = {
  userId: '',
  token: getToken(),
  user: {},
  introduction: '',
  roles: []
}

const mutations = {

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USER: (state, name) => {
    state.user = user
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
        console.log("登录成")
      
        if (response.code == 200) {
          console.log("第一步")
          const { token } = response;
          // 将token放到vuex
          commit('SET_TOKEN',token)
          // 储存token 到cookie
          setToken(token);
           // 登录成功获取用户信息
   
        }

        resolve()
      }).catch(error => {

        this.$message('储存token失败');


        
        
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let userRole=['admin'];

      commit('SET_ROLES',userRole);
      resolve(userRole)
      // getInfo().then(response => {
      //   const { userInfo } = response
      //   if (!respData) {
      //     reject('认证失败，请重新登录')
      //   }

      //   commit('SET_USER', userInfo);
      //   // const { roles, name, avatar, introduction, nikeName, userPic } = respData;
 
      //   resolve(respData)
      // }).catch(error => {

      //   this.$message('获取用户信息失败');
      //   reject(error)
      // })
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
