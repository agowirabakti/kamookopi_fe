import Axios from 'axios'

const state = () => ({
  masuk: {},
  loading: false,
  host: "http://localhost:3000"
})

const mutations = {
  SET_MASUK(state, masuk) {
    state.masuk = masuk
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  get_masuks: function({commit, state}) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/masuks";
      Axios.get(url, {headers: headers})
      .then(response => {
        const data = response.data;
        // console.log(data);
        commit('SET_LOADING', false)
        commit('SET_MASUK', data)
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
  tambah_masuk: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/masuks";
      let data_masuk = {
        kelolaId: data.kelola_id,
        stok: data.stok,
        userId: null
      };
      Axios.post(url, data_masuk, {headers: headers})
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