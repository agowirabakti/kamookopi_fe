<template>
  <div>
    <el-breadcrumb separator="/" class="font-4 mb-3">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Laporan</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane class="font-4" name="first" label="Laporan Barang">
        <div>
          <div v-if="get_loading_1">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="!get_loading_1">
            <!-- {{ get_kelolas }} -->
            <div>
              <div class="flex justify-between items-center py-1 border-b">
                <div class="w-64">
                  <p class="font-4 text-sm">Kode barang</p>
                </div>
                <div class="w-1/2">
                  <p class="font-64 text-sm">Nama barang</p>
                </div>
                <div class="flex-grow">
                  <p class="font-4 text-sm">Stok</p>
                </div>
              </div>
            </div>
            <div v-for="(item, index) in get_kelolas" :key="index">
              <div class="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer border-b">
                <div class="w-64">
                  <p class="font-4" v-if="item.barangId == null">Tidak kode barang</p>
                  <p class="font-4 uppercase" v-if="item.barangId != null">{{ item.barang.kode_barang }}</p>
                </div>
                <div class="w-1/2">
                  <p class="font-64" v-if="item.barangId == null">Tidak nama barang</p>
                  <p class="font-64" v-if="item.barangId != null">{{ item.barang.nama_barang }}</p>
                </div>
                <div class="flex-grow">
                  <p class="font-4" v-if="item.stok == null">0</p>
                  <p class="font-4" v-if="item.stok != null">{{ item.stok }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="font-4" name="second" label="Laporan Barang Masuk">
        <div>
          <div v-if="get_loading_2">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="!get_loading_2">
            <!-- {{  get_masuks  }} -->
            <div>
              <div class="flex justify-end items-center">
                <div>
                  <el-select v-model="value_barang_masuk" filterable placeholder="Select" size="mini">
                    <el-option v-for="(item, index) in get_kelolas" :key="index" :label="item.barang.nama_barang" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="ml-0.5">
                  <el-button icon="el-icon-search" size="mini" @click="search_barang_masuk" circle></el-button>
                </div>
                <div class="ml-0.5">
                  <el-button icon="el-icon-refresh" size="mini" @click="refresh_barang_masuk" circle></el-button>
                </div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center py-1 border-b">
                <div class="w-1/2">
                  <p class="font-64 text-xs">Hari, Tanggal</p>
                </div>
                <div class="flex-grow">
                  <p class="font-4 text-xs">Stok</p>
                </div>
              </div>
            </div>
            <div v-for="(item, index) in get_masuks" :key="index">
              <div class="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer border-b">
                <div class="w-1/2">
                  <p class="font-64 text-sm" v-if="item.createdAt != null">{{ item.createdAt | tanggal }} <span class="ml-2"><i class="el-icon-time"></i> {{ item.createdAt | waktu }}</span></p>
                </div>
                <div class="flex-grow">
                  <p class="font-4 text-sm" v-if="item.stok == null">0</p>
                  <p class="font-4 text-sm" v-if="item.stok != null">{{ item.stok }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="font-4" name="thirth" label="Laporan Barang Keluar">
        <div>
          <div v-if="get_loading_3">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="!get_loading_3">
            <!-- {{  get_keluars  }} -->
            <div>
              <div class="flex justify-end items-center">
                <div>
                  <el-select v-model="value_barang_keluar" filterable placeholder="Select" size="mini">
                    <el-option v-for="(item, index) in get_kelolas" :key="index" :label="item.barang.nama_barang" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="ml-0.5">
                  <el-button icon="el-icon-search" size="mini" @click="search_barang_keluar" circle></el-button>
                </div>
                <div class="ml-0.5">
                  <el-button icon="el-icon-refresh" size="mini" @click="refresh_barang_keluar" circle></el-button>
                </div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center py-1 border-b">
                <div class="w-1/2">
                  <p class="font-64 text-xs">Hari, Tanggal</p>
                </div>
                <div class="flex-grow">
                  <p class="font-4 text-xs">Stok</p>
                </div>
              </div>
            </div>
            <div v-for="(item, index) in get_keluars" :key="index">
              <div class="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer border-b">
                <div class="w-1/2">
                  <p class="font-64 text-sm" v-if="item.createdAt != null">{{ item.createdAt | tanggal }} <span class="ml-2"><i class="el-icon-time"></i> {{ item.createdAt | waktu }}</span></p>
                </div>
                <div class="flex-grow">
                  <p class="font-4 text-sm" v-if="item.stok == null">0</p>
                  <p class="font-4 text-sm" v-if="item.stok != null">{{ item.stok }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="font-4" name="forth" label="History Barang">History Barang</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      activeName: 'first',
      value_barang_masuk: null,
      value_barang_keluar: null
    }
  },
  filters: {
    tanggal: function(value) {
      moment.locale('id');
      return moment(value).format('dddd')+', '+moment(value).format('LL');
    },
    waktu: function(value) {
      moment.locale('id');
      return moment(value).format('hh:mm');
    }
  },
  computed: {
    get_kelolas() {
      return this.$store.state.kelola.kelola
    },
    get_masuks() {
      return this.$store.state.masuk.masuk
    },
    get_keluars() {
      return this.$store.state.keluar.keluar
    },
    get_loading_1() {
      return this.$store.state.kelola.loading
    },
    get_loading_2() {
      return this.$store.state.masuk.loading
    },
    get_loading_3() {
      return this.$store.state.keluar.loading
    },
  },
  created() {
    this.$store.dispatch('kelola/get_kelolas')
    // this.$store.dispatch('masuk/get_masuks')
    // this.$store.dispatch('keluar/get_keluars')
  },
  methods: {
    search_barang_masuk: function(){
      this.$store.dispatch('masuk/getmasuks', {id: this.value_barang_masuk})
    },
    refresh_barang_masuk: function(){
      this.value_barang_masuk = null;
      this.$store.dispatch('masuk/getmasuks', {id: null})
    },
    search_barang_keluar: function(){
      this.$store.dispatch('keluar/getkeluars', {id: this.value_barang_keluar})
    },
    refresh_barang_keluar: function(){
      this.value_barang_keluar = null;
      this.$store.dispatch('keluar/getkeluars', {id: null})
    }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
.font-1{font-family: 'Ubuntu', sans-serif;}
.font-2{font-family: 'Dosis', sans-serif;}
.font-3{font-family: 'Quicksand', sans-serif;}
.font-4{font-family: 'Open Sans', sans-serif;}
</style>