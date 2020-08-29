<template>
<div class="fondo">
  <b-container class="container"> 
   
      <login-form/>
     
  </b-container>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.fondo{
  background-image: url('/assets/img/aves.jpg');
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 100vh;
  margin-top: -3rem;
}

</style>