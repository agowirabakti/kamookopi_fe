<template>
  <div>
    <div class="big-image">
      <div class="min-w-screen min-h-screen flex items-center justify-center">
        <div class="text-center">
          <img src="@/assets/img/coffee-beans.png" class="mx-auto cursor-pointer" @click="getViews('/login')" style="width:250px;" alt="">
          <p class="font-extrabold text-7xl font-1 p-0 mx-0 mt-5 mb-2" style="color:#43c59e">Kamookopi</p>
          <p class="text-lg font-3 p-0 mx-0 mt-0 mb-0" style="color:#3D7068"><span>#AKUKAMOODANMEREKASATU</span> <span>#MengIndonesiakanKamoo</span></p>
          <div class="flex justify-center items-center">
            <div class="mx-1">
              <p class="p-0 m-0"><font-awesome-icon icon="fa-solid fa-location-dot" /></p>
            </div>
            <div class="mx-1">
              <p class="text-md p-0 m-0"><font-awesome-icon icon="fa-brands fa-instagram" /></p>
            </div>
            <div class="mx-1">
              <p class="text-md p-0 m-0"><font-awesome-icon icon="fa-brands fa-whatsapp" /></p>
            </div>
            <!-- <div class="mx-1">
              <p class="p-0 m-0"><font-awesome-icon icon="fa-regular fa-circle-right" /></p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getViews: function(value){
      if (this.$route.path !== value) {
        this.$router.push(value);
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
.font-1{font-family: 'Quicksand', sans-serif;}
.font-2{font-family: 'Dosis', sans-serif;}
.font-3{font-family: 'Bebas Neue', cursive;}
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