<template>
  <div class="big-image">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20">
        <div class="flex justify-between items-center pt-5 pb-5 mb-5 border-b border-gray-400">
          <div class="">
            <img src="@/assets/img/coffee-beans_1.png" alt="" class="w-12 mx-auto">
          </div>
          <div class="w-64">
            <div class="flex justify-between items-center">
              <div class="">
                <p class="font-1 text-xs uppercase cursor-pointer p-0 m-0" @click="getViews('/F90rVF7OEfhW')">Data Master</p>
              </div>
              <div class="">
                <p class="font-1 text-xs uppercase cursor-pointer p-0 m-0" @click="getViews('/F47JdIHuxXB5')">Transaksi</p>
              </div>
              <div class="">
                <p class="font-1 text-xs uppercase cursor-pointer p-0 m-0" @click="getViews('/Ev787fv9Alri')">Laporan</p>
              </div>
            </div>
          </div>
          <div class="">
            <p class="font-1 text-xs uppercase cursor-pointer p-0 m-0"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> LOGOUT</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20">
        <!-- <div> -->
          <router-view/>
        <!-- </div> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    getViews: function(value){
      if (this.$route.path !== value) {
        this.$router.push(value);
      }
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
.font-1{font-family: 'Ubuntu', sans-serif;}
.big-image{
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-image: 50% 50%;
  background-image: url('../assets/img/img_2.jpg');
  animation: slide 13s linear 2s infinite alternate;
  /* animation: slide 10s infinite; */
}
</style>