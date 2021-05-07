import {managerLogin, logout, getInfo} from '../../api/managerApi'
import {setUserName, getToken, clearToken, setToken, getUserName} from '../../utils/session'
import {resetRouter} from '../../router'

const getDefaultState = () => {
  return {
    data: {},
    success: false,
    token: getToken(),
    nickName: getUserName()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_SUCCESS: (state, success) => {
    state.success = success
  },
  SET_DATA: (state, data) => {
    state.data = data
  }
}

const actions = {
  // user login
  login ({commit}, userInfo) {
    const {name, password} = userInfo
    return new Promise((resolve, reject) => {
      managerLogin({name: name.trim(), password: password}).then(response => {
        const {data} = response
        console.log(response)
        if (data.state) {
          commit('SET_TOKEN', data.token)
          commit('SET_DATA', response.data)
          commit('SET_SUCCESS', true)
          setToken(data.token)
          setUserName(data.nickname.toString())
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response

        if (!data) {
          return Promise.reject(new Error('Verification failed, please Login again.'))
        }

        const {name, avatar} = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        clearToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({commit}) {
    return new Promise(resolve => {
      clearToken() // must remove  token  first
      commit('RESET_STATE')
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
