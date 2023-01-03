<template>
  <div>
    <el-breadcrumb separator="/" class="font-4 mb-3">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Data Master</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" class="font-3" type="border-card">
      <el-tab-pane class="font-4" name="first" label="Data Barang">
        <div>
          <div v-if="get_loading_1">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="!get_loading_1">
            <div class="flex justify-end mb-2">
              <div>
                <el-button type="primary" size="mini" @click="open_dialogvisiblebarang"><i class="el-icon-plus"></i> Tambah Barang</el-button>
              </div>
            </div>
            <div v-for="(item, index) in get_barangs" :key="index">
              <div class="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer border-b">
                <div class="w-24">
                  <p class="font-4" v-if="item.kode_barang == null">Tidak kode barang</p>
                  <p class="font-4 uppercase" v-if="item.kode_barang != null">{{ item.kode_barang }}</p>
                </div>
                <div class="flex-grow w-24">
                  <p class="font-4" v-if="item.nama_barang == null">Tidak nama barang</p>
                  <p class="font-4" v-if="item.nama_barang != null">{{ item.nama_barang }}</p>
                </div>
                <div class="ml-0.5">
                  <el-button size="mini" circle @click="open_updatedialogvisiblebarang(item.id, item.nama_barang)"><i class="el-icon-edit"></i></el-button>
                </div>
                <div class="ml-0.5">
                  <el-button size="mini" @click="open_deletedialogvisiblebarang(item.id, item.nama_barang)" circle><i class="el-icon-delete"></i></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="font-4" name="second" label="Data User">
        <div>
          <div v-if="get_loading">
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="!get_loading">
            <div class="flex justify-end mb-2">
              <div>
                <el-button type="primary" size="mini" @click="open_dialogvisible"><i class="el-icon-user"></i> Tambah User</el-button>
              </div>
            </div>
            <div v-for="(item, index) in get_users" :key="index">
              <div class="flex justify-between items-center py-2 hover:bg-gray-50 cursor-pointer border-b">
                <div class="flex-grow w-24">
                  <p class="font-4" v-if="item.name == null">No name</p>
                  <p class="font-4" v-if="item.name != null">{{ item.name }}</p>
                </div>
                <div class="flex-grow w-24">
                  <p class="font-4" v-if="item.username == null">No username</p>
                  <p class="font-4" v-if="item.username != null">{{ item.username }}</p>
                </div>
                <div class="flex-grow w-24">
                  <p class="font-4 text-sm" v-if="item.status == null">No status</p>
                  <p class="font-4 text-sm" v-if="item.status != null">{{ item.status }}</p>
                </div>
                <div class="ml-0.5">
                  <el-button size="mini" circle @click="open_updatedialogvisible(item.id, item.name, item.username, item.status)"><i class="el-icon-edit"></i></el-button>
                </div>
                <div class="ml-0.5">
                  <el-button size="mini" @click="open_deletedialogvisible(item.id, item.username)" circle><i class="el-icon-delete"></i></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="Tambah User" :visible.sync="dialogvisible" width="50%" :before-close="close_dialogvisible">
      <div>
        <el-form>
          <el-form-item label="Email" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Username" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <!-- <el-form-item label="Status" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_dialogvisible" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading" @click="submit_dialogvisible" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Update User" :visible.sync="updatedialogvisible" width="50%" :before-close="close_updatedialogvisible">
      <div>
        <el-form>
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="user.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Username" :label-width="formLabelWidth">
            <el-input v-model="user.username" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off" show-password></el-input>
          </el-form-item> -->
          <el-form-item label="Status" :label-width="formLabelWidth">
            <el-radio v-model="user.status" :label="1">Active</el-radio>
            <el-radio v-model="user.status" :label="0" >No Active</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_updatedialogvisible" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading" @click="submit_updatedialogvisible(user.id)" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Warning" :visible.sync="deletedialogvisible" width="30%" :before-close="close_deletedialogvisible" center>
      <div>
        <p class="text-center">Yakin <span class="font-semibold">{{ user.username }}</span> dihapus?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel_deletedialogvisible">Cancel</el-button>
        <el-button type="danger" size="mini" :loading="get_loading" @click="submit_deletedialogvisible(user.id)">Delete</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Tambah Barang" :visible.sync="dialogvisiblebarang" width="50%" :before-close="close_dialogvisiblebarang">
      <div>
        <el-form>
          <el-form-item label="Nama Barang" :label-width="formLabelWidthBarang">
            <el-input v-model="form.nama_barang" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_dialogvisiblebarang" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading_1" @click="submit_dialogvisiblebarang" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Update Barang" :visible.sync="updatedialogvisiblebarang" width="50%" :before-close="close_updatedialogvisiblebarang">
      <div>
        <el-form>
          <el-form-item label="Nama Barang" :label-width="formLabelWidthBarang">
            <el-input v-model="form.nama_barang" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_updatedialogvisiblebarang" size="mini">Cancel</el-button>
        <el-button type="primary" :loading="get_loading_1" @click="submit_updatedialogvisiblebarang(barang.id)" size="mini">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Warning" :visible.sync="deletedialogvisiblebarang" width="30%" :before-close="close_deletedialogvisiblebarang" center>
      <div>
        <p class="text-center">Yakin <span class="font-semibold">{{ barang.nama_barang }}</span> dihapus?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel_deletedialogvisiblebarang">Cancel</el-button>
        <el-button type="danger" size="mini" :loading="get_loading_1" @click="submit_deletedialogvisiblebarang(barang.id)">Delete</el-button>
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
      updatedialogvisible: false,
      deletedialogvisible: false,
      dialogvisiblebarang: false,
      updatedialogvisiblebarang: false,
      deletedialogvisiblebarang: false,
      form: {
        name: null,
        username: null,
        password: null,
        email: null,
        status: false,
        kode_barang: null,
        nama_barang: null,
        id_user: null
      },
      user: {id: null, name: null, username: null, status: 0},
      barang: {id: null, kode_barang: null, nama_barang: null},
      formLabelWidth: '90px',
      formLabelWidthBarang: '100px'
    }
  },
  computed: {
    get_users() {
      return this.$store.state.pengguna.user
    },
    get_barangs() {
      return this.$store.state.barang.barang
    },
    get_loading() {
      return this.$store.state.pengguna.loading
    },
    get_loading_1() {
      return this.$store.state.barang.loading
    }
  },
  created() {
    this.$store.dispatch('pengguna/get_users')
    this.$store.dispatch('barang/get_barangs')
  },
  methods: {
    open_dialogvisible: function() {
      this.dialogvisible = true;
      this.form.email = null;
      this.form.username = null;
      this.form.password = null;
    },
    close_dialogvisible: function() {
      this.dialogvisible = false;
    },
    submit_dialogvisible: function() {
      this.$store.dispatch('pengguna/register', {email: this.form.email, username: this.form.username, password: this.form.password})
      .then(() => {
        this.dialogvisible = false;
        this.$store.dispatch('pengguna/get_users')
      })
    },
    cancel_dialogvisible: function() {
      this.dialogvisible = false;
    },
    open_deletedialogvisible: function(id, username) {
      this.deletedialogvisible = true;
      this.user.id = id;
      this.user.username = username;
    },
    close_deletedialogvisible: function() {
      this.deletedialogvisible = false;
    },
    submit_deletedialogvisible: function(id) {
      this.$store.dispatch('pengguna/delete_user', {id: id})
      .then(() => {
        this.deletedialogvisible = false;
        this.$store.dispatch('pengguna/get_users')
      })
    },
    cancel_deletedialogvisible: function() {
      this.deletedialogvisible = false;
    },
    open_updatedialogvisible: function(id, name, username, status) {
      this.updatedialogvisible = true;
      this.user.id = id;
      this.user.name = name;
      this.user.username = username;
      this.user.status = status;
    },
    close_updatedialogvisible: function() {
      this.updatedialogvisible = false;
    },
    submit_updatedialogvisible: function(id) {
      this.$store.dispatch('pengguna/update_user', {id: id, name: this.user.name, username: this.user.username, status: this.user.status})
      .then(() => {
        this.updatedialogvisible = false;
        this.$store.dispatch('pengguna/get_users')
      })
    },
    cancel_updatedialogvisible: function() {
      this.updatedialogvisible = false;
    },
    open_dialogvisiblebarang: function() {
      this.dialogvisiblebarang = true;
      this.form.kode_barang = null;
      this.form.nama_barang = null;
      this.form.id_user = null;
    },
    close_dialogvisiblebarang: function() {
      this.dialogvisiblebarang = false;
    },
    submit_dialogvisiblebarang: function() {
      this.$store.dispatch('barang/tambah_barang', {kode_barang: this.generate_string(5), nama_barang: this.form.nama_barang, id_user: 1})
      .then(() => {
        this.dialogvisiblebarang = false;
        this.$store.dispatch('barang/get_barangs')
      })
    },
    cancel_dialogvisiblebarang: function() {
      this.dialogvisiblebarang = false;
    },
    open_updatedialogvisiblebarang: function(id, nama_barang) {
      this.updatedialogvisiblebarang = true;
      this.form.nama_barang = nama_barang;
      this.barang.id = id;
    },
    close_updatedialogvisiblebarang: function() {
      this.updatedialogvisiblebarang = false;
    },
    submit_updatedialogvisiblebarang: function(id) {
      this.$store.dispatch('barang/update_barang', {nama_barang: this.form.nama_barang, id: id})
      .then(() => {
        this.updatedialogvisiblebarang = false;
        this.$store.dispatch('barang/get_barangs')
      })
    },
    cancel_updatedialogvisiblebarang: function() {
      this.updatedialogvisiblebarang = false;
    },
    open_deletedialogvisiblebarang: function(id, nama_barang) {
      this.deletedialogvisiblebarang = true;
      this.barang.id = id;
      this.barang.nama_barang = nama_barang;
    },
    close_deletedialogvisiblebarang: function() {
      this.deletedialogvisiblebarang = false;
    },
    submit_deletedialogvisiblebarang: function(id) {
      this.$store.dispatch('barang/delete_barang', {id: id})
      .then(() => {
        this.deletedialogvisiblebarang = false;
        this.$store.dispatch('barang/get_barangs')
      })
    },
    cancel_deletedialogvisiblebarang: function() {
      this.deletedialogvisiblebarang = false;
    },
    generate_string: function(length) {
      let result = '';
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
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