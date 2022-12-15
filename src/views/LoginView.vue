<template>
  <div>
    <div class="big-image">
      <div class="min-w-screen min-h-screen flex items-center justify-center">
        <div class="w-64">
          <img src="@/assets/img/coffee-beans_1.png" alt="" class="w-32 mx-auto mb-0.5">
          <p class="font-extrabold text-center text-md font-1 p-0 mx-0 mt-0 mb-2" style="color:#43c59e">Kamookopi</p>
          <el-input class="font-4 p-0 mx-0 mt-0 mb-1" placeholder="Username" v-model="input"></el-input>
          <el-input class="font-4 p-0 mx-0 mt-0 mb-1" placeholder="Password" v-model="input" show-password></el-input>
          <el-button class="w-full" size="small" type="primary">LOGIN <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: null
    }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
.font-1{font-family: 'Quicksand', sans-serif;}
.font-2{font-family: 'Dosis', sans-serif;}
.font-3{font-family: 'Bebas Neue', cursive;}
.font-4{font-family: 'Lato', sans-serif;}
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