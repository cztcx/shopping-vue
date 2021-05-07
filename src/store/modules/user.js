import {userLogin, logout, getInfo, UserUpdate, retrieve} from '../../api/userApi'
import {resetRouter} from '../../router'
import {setIsSeller, setUserName, getToken, clearToken, setToken, getUserName, setId, getId} from '../../utils/session'

const getDefaultState = () => {
  return {
    data: {},
    user: {},
    success: false,
    token: getToken(),
    nickName: getUserName(),
    id: getId()
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
  },
  SET_USER: (state, data) => {
    state.user = data
  }
}

const actions = {
  // user login
  login ({commit}, userInfo) {
    const {name, password} = userInfo
    return new Promise((resolve, reject) => {
      userLogin({name: name.trim(), password: password}).then(response => {
        const {data} = response
        console.log(response)
        if (data.state) {
          commit('SET_TOKEN', data.token)
          commit('SET_DATA', response.data)
          commit('SET_SUCCESS', true)
          setToken(data.token)
          setUserName(data.nickname)
          setId(data.id)
          if (data.isSeller === '1') {
            setIsSeller(true)
          } else {
            setIsSeller(false)
          }
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  update ({commit}, data) {
    return new Promise((resolve, reject) => {
      UserUpdate(data).then(response => {
        console.log(response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  retrieve ({commit}, userId) {
    return new Promise((resolve, reject) => {
      retrieve(userId).then(response => {
        console.log(response)
        commit('SET_USER', response.data)
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
