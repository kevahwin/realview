<template>
  <div>
    <NavbarHome />
    <MainComp />
    <ToolBar />
  </div>
</template>

<script>

import axios from 'axios'
import MainComp from '../components/MainComp.vue'
import NavbarHome from '../components/NavbarHome.vue'
import router from '../router/index.js'
import ToolBar from '../components/ToolBar.vue'

export default {
  name: 'App',
  components: {
    MainComp,
    NavbarHome,
    ToolBar,
  },
  data() {
    return {
      firstName: ''
    }
  },
  created() {
    // User is not authorised
    if (localStorage.getItem('token') === null) {
      router.push('LoginView');
    }
  },
  mounted() {
    axios.get('/api/user', { headers: { token: localStorage.getItem('token') } })
      .then(res => {
        console.log(res);
        this.firstName = res.data.user.firstName;
      })
  },
  methods: {
    logout() {
      localStorage.clear();
      router.push('LoginView')
    }
  }
}
</script>

<style>
.logout-button {
display: block;
margin: 0 auto;
padding: 0.5rem 1rem;
border-radius: 0px;
font-size: 1rem;
background-color: #22324E;
color: #fff;
border: none;
transition: all 0.2s ease-in-out;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>