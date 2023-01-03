import Axios from 'axios'

const state = () => ({
  barang: {},
  loading: false,
  host: "http://localhost:3000"
})

const mutations = {
  SET_BARANG(state, barang) {
    state.barang = barang
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  get_barangs: function({commit, state}) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/barangs";
      Axios.get(url, {headers: headers})
      .then(response => {
        const data = response.data;
        // console.log(data);
        commit('SET_LOADING', false)
        commit('SET_BARANG', data)
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
  tambah_barang: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/barangs";
      let data_barang = {
        kode_barang: data.kode_barang,
        nama_barang: data.nama_barang,
        id_user: data.id_user
      };
      Axios.post(url, data_barang, {headers: headers})
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
  update_barang: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/barangs/"+data.id;
      let data_barang = {
        nama_barang: data.nama_barang
      };
      Axios.put(url, data_barang, {headers: headers})
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
  delete_barang: function({commit, state}, data) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      let headers = {'x-access-token': sessionStorage.getItem('token')}
      let url = state.host+"/api/barangs/"+data.id;
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