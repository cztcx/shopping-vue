
import {create, getGoodsByCID, getGoodsByID} from '../../api/goodsApi'

const state = () => {
  return {
    data: {},
    goods: {}
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_GOODS: (state, data) => {
    state.goods = data
  }
}

const actions = {
  // 创建新商品
  create ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      create(data).then(response => {
        const {data} = response
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGoodsByCID ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      getGoodsByCID(data).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_DATA', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getGoodsByID ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      getGoodsByID(data).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_GOODS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
