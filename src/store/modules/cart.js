import {add, getCartByUserID, deleteSelect} from '../../api/cartApi'

const state = () => {
  return {
    data: []
  }
}

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  }
}

const actions = {
  // 添加购物车
  add ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      add(data).then(response => {
        const {data} = response
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCart ({commit}, userId) {
    return new Promise((resolve, reject) => {
      console.log(userId)
      getCartByUserID(userId).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_DATA', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteSelect ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      deleteSelect(data).then(response => {
        const {data} = response
        console.log(data)
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
