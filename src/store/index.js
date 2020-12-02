import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { uuid } from '@/utils/util'
import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: null,
      token: null,
      type: null,
    }
  },
  getters,
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      state[key] = value
    }
  },
  actions: {
    changeSetting ({ commit }, data) {
      commit('CHANGE_SETTING', data)
    },
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      console.log(username, password)
      return new Promise((resolve, reject) => {
        const token = uuid()
        const user = { name: username, token: token, type: 1 }
        commit('CHANGE_SETTING', { user: user })
        setToken(token)
        resolve()
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        removeToken()
        resolve()
      })
    },
  }
})

export default store
