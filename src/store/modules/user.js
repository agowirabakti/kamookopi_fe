import Axios from 'axios'

const state = () => ({
  user: {},
  loading: false,
  host: "http://localhost:3000"
})

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  register: function({commit, state}, data) {
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/auth/signup";
      let data_user = {
        username: data.username,
        email: data.email,
        password: data.password
      };
      Axios.post(url, data_user, {headers: headers})
      .then(response => {
        commit('SET_LOADING', false)
        resolve(response)
      })
      .catch(error => {
        if (error.response.status == 401) {
          commit('SET_LOGOUT')
          sessionStorage.removeItem('token')
          delete Axios.defaults.headers.common['x-access-token']
          this.$router.push({name: 'login'})
        }
        reject(error)
      })
    })
  },
  get_users: function({commit, state}) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/users";
      Axios.get(url, {headers: headers})
      .then(response => {
        const data = response.data;
        // console.log(data);
        commit('SET_LOADING', false)
        commit('SET_USER', data)
        resolve(response)
      })
      .catch(error => {
        if (error.response.status == 401) {
          commit('SET_LOGOUT')
          sessionStorage.removeItem('token')
          delete Axios.defaults.headers.common['x-access-token']
          this.$router.push({name: 'login'})
        }
        reject(error)
      })
    })
  },
  update_user: function({commit, state}, data) {
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/users/"+data.id;
      let data_user = {
        name: data.name,
        username: data.username,
        status: data.status
      };
      Axios.put(url, data_user, {headers: headers})
      .then(response => {
        commit('SET_LOADING', false)
        resolve(response)
      })
      .catch(error => {
        if (error.response.status == 401) {
          commit('SET_LOGOUT')
          sessionStorage.removeItem('token')
          delete Axios.defaults.headers.common['x-access-token']
          this.$router.push({name: 'login'})
        }
        reject(error)
      })
    })
  },
  delete_user: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/users/"+data.id;
      Axios.delete(url, {headers: headers})
      .then(response => {
        commit('SET_LOADING', false)
        resolve(response)
      })
      .catch(error => {
        if (error.response.status == 401) {
          commit('SET_LOGOUT')
          sessionStorage.removeItem('token')
          delete Axios.defaults.headers.common['x-access-token']
          this.$router.push({name: 'login'})
        }
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