import {getAll, create, retrieve, update, Delete} from '../../api/addressApi'

const state = () => {
  return {
    data: [],
    address: {}
  }
}

const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_ADDRESS: (state, data) => {
    state.address = data
  }
}

const actions = {
  // 得到地址
  getAll ({commit}, userId) {
    return new Promise((resolve, reject) => {
      console.log(userId)
      getAll(userId).then(response => {
        const {data} = response
        console.log(response)
        commit('SET_DATA', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  create ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      create(data).then(response => {
        const {data} = response
        console.log(response)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  retrieve ({commit}, addressId) {
    return new Promise((resolve, reject) => {
      console.log(addressId)
      retrieve(addressId).then(response => {
        const {data} = response
        console.log(response)
        commit('SET_ADDRESS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  update ({commit}, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      update(data).then(response => {
        const {data} = response
        console.log(response)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  Delete ({commit}, addressId) {
    return new Promise((resolve, reject) => {
      console.log(addressId)
      Delete(addressId).then(response => {
        const {data} = response
        console.log(response)
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
