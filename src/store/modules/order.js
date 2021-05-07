import {add, getUserOrders} from '../../api/orderApi'

const state = () => {
  return {
    data: {},
    userOrders: {},
    shopOrders: {}
  }
}

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_USERORDERS: (state, userOrders) => {
    state.userOrders = userOrders
  }
}

const actions = {
  // 创建新商品
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
  getUserOrders ({commit}, userId) {
    return new Promise((resolve, reject) => {
      console.log(userId)
      getUserOrders(userId).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_USERORDERS', data)
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
