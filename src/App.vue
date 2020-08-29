<template>
  <b-main id="app">
    <nav-bar :brand="'Aves Chilenas'"/>
  <router-view/>
  </b-main>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  components:{
    NavBar
  }
}
</script>

<style lang="scss">
*{
   margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
