<template>
<div>
  <NavbarComponent />
  <MainComp />
  <SimpleUpload />
  <PostComponent />
  
</div> 
</template>

<script>

import PostComponent from './components/PostComponent.vue'
import MainComp from './components/MainComp.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import SimpleUpload from './components/SimpleUpload.vue'

export default {
  name: 'App',
  components: {
    SimpleUpload,
    PostComponent,
    MainComp,
    NavbarComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
