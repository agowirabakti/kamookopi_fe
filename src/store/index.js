import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import pengguna from './modules/user'
import barang from './modules/barang'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: sessionStorage.getItem("token") || null,
    message: null,
    loading: false,
    host: "http://localhost:3000"
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  mutations: {
    SET_TOKEN(state, token){
      state.token = token
    },
    SET_MESSAGE(state, message){
      state.message = message
    },
    SET_LOADING(state, loading){
      state.loading = loading
    },
    SET_LOGOUT(state){
      state.token = null
      state.message = null
      state.loading = false
    }
  },
  actions: {
    login({commit, state}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', true);
        let url = state.host+"/api/auth/signin";
        // let url = "http://localhost:8096/api/auth/SqU8JiAIg9GV";
        let data_json = {"username": user.username, "password": user.password};
        Axios.post(url, data_json)
        .then(response => {
          // console.log(response.data);
          // this.msg = response.data;
          const token = response.data.accessToken;
          // if (this.msg.message != "authentication failed") {
            sessionStorage.setItem('token', token);
            Axios.defaults.headers.common['x-access-token'] = token;
          // }
          
          commit('SET_LOADING', false)
          commit('SET_TOKEN', token)
          // commit('set_message', this.msg.message)
          resolve(response)
        })
        .catch(error => {
          sessionStorage.removeItem('token')
          commit('SET_LOADING', false)
          reject(error)
        })
      })
    },
    logout: function({commit}){
      return new Promise((resolve) => {
        commit('SET_LOGOUT')
        sessionStorage.removeItem('token')
        delete Axios.defaults.headers.common['x-access-token']
        resolve()
      })
    },
  },
  modules: {
    pengguna,
    barang
  }
})
