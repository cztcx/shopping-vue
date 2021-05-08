import {add, getUserHistoryOrders, deleteHistoryOrder} from '../../api/orderHistoryApi'

const state = () => {
  return {
    data: {},
    userHistoryOrders: {},
    shopHistoryOrders: {}
  }
}

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_USERORDERS: (state, userHistoryOrders) => {
    state.userHistoryOrders = userHistoryOrders
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
  getUserHistoryOrders ({commit}, userId) {
    return new Promise((resolve, reject) => {
      console.log(userId)
      getUserHistoryOrders(userId).then(response => {
        const {data} = response
        console.log(data)
        commit('SET_USERORDERS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteHistoryOrder ({commit}, orderHistoryId) {
    return new Promise((resolve, reject) => {
      console.log(orderHistoryId)
      deleteHistoryOrder(orderHistoryId).then(response => {
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
