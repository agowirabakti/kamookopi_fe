<template>
  <div>
    <el-breadcrumb separator="/" class="font-4 mb-3">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Transaksi</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane class="font-4" name="first" label="Kelola Barang">
        <div>
          <div v-if="get_loading">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="!get_loading">
            <div class="flex justify-end mb-2">
              <div>
                <el-button type="primary" size="mini" @click="open_dialogvisible"><i class="el-icon-plus"></i> Tambah Kelola Barang</el-button>
              </div>
            </div>
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
                <div class="ml-0.5">
                  &nbsp;
                </div>
                <div class="ml-0.5">
                  &nbsp;
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
                <div class="ml-0.5">
                  <el-button size="mini" circle  @click="open_masukdialogvisible(item.id, item.barang.nama_barang)"><i class="el-icon-plus"></i></el-button>
                </div>
                <div class="ml-0.5">
                  <el-button size="mini" circle @click="open_keluardialogvisible(item.id, item.barang.nama_barang)"><i class="el-icon-minus"></i></el-button>
                </div>
                <!-- <div class="ml-0.5">
                  <el-button size="mini" circle ><i class="el-icon-edit"></i></el-button>
                </div> -->
                <div class="ml-0.5">
                  <el-button size="mini" circle @click="open_deletedialogvisible(item.id, item.barang.nama_barang)"><i class="el-icon-delete"></i></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="Tambah Kelola Barang" :visible.sync="dialogvisible" width="50%" :before-close="close_dialogvisible">
      <div>
        <el-form>
          <el-form-item label="Nama Barang" :label-width="formLabelWidth">
            <el-select v-model="form.nama_barang" filterable placeholder="Select" style="width:100%">
              <el-option v-for="item in get_barangs" :key="item.kode_barang" :label="item.nama_barang" :value="item.id"></el-option>
            </el-select>
            <!-- <el-input v-model="form.nama_barang" autocomplete="off"></el-input> -->
          </el-form-item>
          <el-form-item label="Stok" :label-width="formLabelWidth">
            <el-input-number v-model="form.stok" controls-position="right" :min="0" :max="100"></el-input-number>
            <!-- <el-input-number v-model="form.stok" :min="0" :max="100"></el-input-number> -->
            <!-- <el-input v-model="form.stok" autocomplete="off"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_dialogvisible" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading" @click="submit_dialogvisible" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Barang Masuk" :visible.sync="masukdialogvisible" width="50%" :before-close="close_masukdialogvisible">
      <div>
        <el-form>
          <el-form-item label="Nama Barang" :label-width="formLabelWidth">
            <!-- <el-select v-model="form.nama_barang" filterable placeholder="Select" style="width:100%">
              <el-option v-for="item in get_barangs" :key="item.kode_barang" :label="item.nama_barang" :value="item.id"></el-option>
            </el-select> -->
            <el-input v-model="form.nama_barang" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="Stok" :label-width="formLabelWidth">
            <el-input-number v-model="form.stok" controls-position="right" :min="0" :max="100"></el-input-number>
            <!-- <el-input-number v-model="form.stok" :min="0" :max="100"></el-input-number> -->
            <!-- <el-input v-model="form.stok" autocomplete="off"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_masukdialogvisible" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading" @click="submit_masukdialogvisible(form.id)" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Barang Keluar" :visible.sync="keluardialogvisible" width="50%" :before-close="close_keluardialogvisible">
      <div>
        <el-form>
          <el-form-item label="Nama Barang" :label-width="formLabelWidth">
            <!-- <el-select v-model="form.nama_barang" filterable placeholder="Select" style="width:100%">
              <el-option v-for="item in get_barangs" :key="item.kode_barang" :label="item.nama_barang" :value="item.id"></el-option>
            </el-select> -->
            <el-input v-model="form.nama_barang" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="Stok" :label-width="formLabelWidth">
            <el-input-number v-model="form.stok" controls-position="right" :min="0" :max="100"></el-input-number>
            <!-- <el-input-number v-model="form.stok" :min="0" :max="100"></el-input-number> -->
            <!-- <el-input v-model="form.stok" autocomplete="off"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_keluardialogvisible" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading" @click="submit_keluardialogvisible(form.id)" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Warning" :visible.sync="deletedialogvisible" width="30%" :before-close="close_deletedialogvisible" center>
      <div>
        <p class="text-center">Yakin <span class="font-semibold">{{ form.nama_barang }}</span> dihapus?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel_deletedialogvisible">Cancel</el-button>
        <el-button type="danger" size="mini" :loading="get_loading" @click="submit_deletedialogvisible(form.id)">Delete</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      dialogvisible: false,
      deletedialogvisible: false,
      masukdialogvisible: false,
      keluardialogvisible: false,
      form: {
        id: null,
        nama_barang: null,
        stok: 0
      },
      formLabelWidth: '100px',
    }
  },
  computed: {
    get_kelolas() {
      return this.$store.state.kelola.kelola
    },
    // get_kata() {
    //   return this.$store.state.kelola.kata
    // },
    get_barangs() {
      return this.$store.state.barang.barang
    },
    get_loading() {
      return this.$store.state.kelola.loading
    },
    get_loading_1() {
      return this.$store.state.barang.loading
    }
  },
  created() {
    this.$store.dispatch('kelola/get_kelolas')
    this.$store.dispatch('barang/get_barangs')
  },
  methods: {
    open_dialogvisible: function() {
      this.dialogvisible = true;
      this.form.nama_barang = null;
      this.form.stok = 0;
    },
    close_dialogvisible: function() {
      this.dialogvisible = false;
    },
    submit_dialogvisible: function() {
      console.log(this.form);
      this.$store.dispatch('kelola/tambah_kelola', {nama_barang: this.form.nama_barang, stok: this.form.stok})
      .then(() => {
        // this.$store.dispatch('masuk/tambah_masuk', {kelola_id: response.data.id, stok: this.form.stok})
        // .then(() => {
          this.dialogvisible = false;
          this.$store.dispatch('kelola/get_kelolas')
        // })
      })
    },
    cancel_dialogvisible: function() {
      this.dialogvisible = false;
    },
    open_deletedialogvisible: function(id, nama_barang) {
      this.deletedialogvisible = true;
      this.form.id = id;
      this.form.nama_barang = nama_barang;
    },
    close_deletedialogvisible: function() {
      this.deletedialogvisible = false;
    },
    submit_deletedialogvisible: function(id) {
      // this.$store.dispatch('masuk/getmasuks', {id: id})
      // .then(response => {
      //   let masuk = response.data;
      //   if (masuk.length > 0) {
      //     this.$store.dispatch('masuk/delete_masuk', {id: id})
      //     .then(() => {
      //       this.$store.dispatch('keluar/getkeluars', {id: id})
      //       .then(response => {
      //         let keluar = response.data;
      //         if (keluar.length > 0) {
      //           this.$store.dispatch('keluar/delete_keluar', {id: id})
      //           .then(() => {
      //             this.$store.dispatch('kelola/delete_kelola', {id: id})
      //             .then(() => {
      //               this.deletedialogvisible = false;
      //               this.$store.dispatch('kelola/get_kelolas')
      //             })
      //           })
      //         }
      //         // console.log();
      //       })
      //     })
      //   } else {
      //     this.$store.dispatch('keluar/getkeluars', {id: id})
      //     .then(response => {
      //       let keluar = response.data;
      //       if (keluar.length > 0) {
      //         this.$store.dispatch('keluar/delete_keluar', {id: id})
      //         .then(() => {
      //           this.$store.dispatch('kelola/delete_kelola', {id: id})
      //           .then(() => {
      //             this.deletedialogvisible = false;
      //             this.$store.dispatch('kelola/get_kelolas')
      //           })
      //         })
      //       } else {
      //         this.$store.dispatch('kelola/delete_kelola', {id: id})
      //         .then(() => {
      //           this.deletedialogvisible = false;
      //           this.$store.dispatch('kelola/get_kelolas')
      //         })
      //       }
      //       // console.log();
      //     })
      //   }
      //   // console.log();
      // })

      // this.$store.dispatch('keluar/getkeluars', {id: id})
      // .then(response => {
      //   let keluar = response.data;
      //   if (keluar.length > 0) {
      //     this.$store.dispatch('keluar/delete_keluar', {id: id})
      //     .then(() => {
            
      //     })
      //   }
      //   // console.log();
      // })

      this.$store.dispatch('kelola/delete_kelola', {id: id})
      .then(() => {
        this.deletedialogvisible = false;
        this.$store.dispatch('kelola/get_kelolas')
      })
    },
    // submit_deletemasuk: function(id) {
    //   this.$store.dispatch('masuk/getmasuks', {id: id})
    //   .then(response => {
    //     let masuk = response.data;
    //     if (masuk.length > 0) {
    //       this.$store.dispatch('masuk/delete_masuk', {id: id})
    //       .then(() => {
    //         return 1;
    //       })
    //     }
    //     // console.log();
    //   })
    // },
    // submit_deletekeluar: function(id) {
    //   this.$store.dispatch('keluar/getkeluars', {id: id})
    //   .then(response => {
    //     let keluar = response.data;
    //     if (keluar.length > 0) {
    //       this.$store.dispatch('keluar/delete_keluar', {id: id})
    //       .then(() => {
    //         return 1;
    //       })
    //     }
    //     // console.log();
    //   })
    // },
    cancel_deletedialogvisible: function() {
      this.deletedialogvisible = false;
    },
    open_masukdialogvisible: function(id, nama_barang) {
      this.masukdialogvisible = true;
      this.form.id = id;
      this.form.nama_barang = nama_barang;
      this.form.stok = 0;
    },
    close_masukdialogvisible: function() {
      this.masukdialogvisible = false;
    },
    submit_masukdialogvisible: function(id) {
      this.$store.dispatch('masuk/tambah_masuk', {kelola_id: id, stok: this.form.stok})
      .then(() => {
        this.masukdialogvisible = false;
        this.$store.dispatch('kelola/get_kelolas')
      })
    },
    cancel_masukdialogvisible: function() {
      this.masukdialogvisible = false;
    },
    open_keluardialogvisible: function(id, nama_barang) {
      this.keluardialogvisible = true;
      this.form.id = id;
      this.form.nama_barang = nama_barang;
      this.form.stok = 0;
    },
    close_keluardialogvisible: function() {
      this.keluardialogvisible = false;
    },
    submit_keluardialogvisible: function(id) {
      this.$store.dispatch('keluar/tambah_keluar', {kelola_id: id, stok: this.form.stok})
      .then(() => {
        this.keluardialogvisible = false;
        this.$store.dispatch('kelola/get_kelolas')
      })
    },
    cancel_keluardialogvisible: function() {
      this.keluardialogvisible = false;
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