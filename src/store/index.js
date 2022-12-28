import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

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
    set_token(state, token){
      state.token = token
    },
    set_message(state, message){
      state.message = message
    },
    set_loading(state, loading){
      state.loading = loading
    },
    set_logout(state){
      state.token = null
      state.message = null
      state.loading = false
    }
  },
  actions: {
    login({commit, state}, user) {
      return new Promise((resolve, reject) => {
        commit('set_loading', true);
        let url = state.host+"/api/auth/signin";
        // let url = "http://localhost:8096/api/auth/SqU8JiAIg9GV";
        let data_json = {"username": user.username, "password": user.password};
        Axios.post(url, data_json)
        .then(response => {
          console.log(response.data);
          // this.msg = response.data;
          const token = response.data.accessToken;
          // if (this.msg.message != "authentication failed") {
            sessionStorage.setItem('token', token);
            Axios.defaults.headers.common['Authorization'] = token;
          // }
          
          commit('set_loading', false)
          commit('set_token', token)
          // commit('set_message', this.msg.message)
          resolve(response)
        })
        .catch(error => {
          sessionStorage.removeItem('token')
          commit('set_loading', false)
          reject(error)
        })
      })
    },
    logout: function({commit}){
      return new Promise((resolve) => {
        commit('set_logout')
        sessionStorage.removeItem('token')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  modules: {
  }
})
