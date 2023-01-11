import Axios from 'axios'

const state = () => ({
  kelola: {},
  kata: {},
  loading: false,
  host: "http://localhost:3000"
})

const mutations = {
  SET_KELOLA(state, kelola) {
    state.kelola = kelola
  },
  SET_KATA(state, kata) {
    state.kata = kata
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  get_kelolas: function({commit, state}) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/kelolas";
      Axios.get(url, {headers: headers})
      .then(response => {
        const data = response.data;
        // console.log(data);
        commit('SET_LOADING', false)
        commit('SET_KELOLA', data)
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
  tambah_kelola: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/kelolas";
      let data_kelola = {
        barangId: data.nama_barang,
        stok: data.stok,
        userId: null
      };
      Axios.post(url, data_kelola, {headers: headers})
      .then(response => {
        commit('SET_LOADING', false)
        // commit('SET_KATA', response.data)
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
  delete_kelola: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/kelolas/"+data.id;
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