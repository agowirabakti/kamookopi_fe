<template>
  <div>
    <el-breadcrumb separator="/" class="font-4 mb-3">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item>Data Master</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" class="font-3" type="border-card">
      <el-tab-pane class="font-4" name="first" label="Data Barang">Data Barang</el-tab-pane>
      <el-tab-pane class="font-4" name="second" label="Data User">Data User</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
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