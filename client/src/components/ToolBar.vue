<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          location="bottom"
          :rail="rail"
          permanent
          :class="{ 'v-navigation-drawer__content': !rail, 'rail': rail }"
        >
        
        <!-- @click="rail = false" -->
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="Uploads"
            nav
          >
            <p for="name" class="nametag">Hello, {{ firstName }}!</p>
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-arrow-expand"
                @click.stop="rail = !rail"
              ></v-btn>
              <v-btn 
              variant="text"
              icon="mdi-refresh"
              @click="onRefreshClick"
              ></v-btn>
              <button class="logout-button" @click="logout">Logout</button>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <SimpleUpload />
        </v-navigation-drawer>
      </v-layout>
    </v-card>
</template>
  
  <script>
  import axios from 'axios'
  import router from '../router/index.js'
  import SimpleUpload from './SimpleUpload.vue';
  
  export default {
    name: 'ToolBar',
    components: {
      SimpleUpload,
    },
    data() {
      return {
        drawer: true,
        rail: true,
        firstName: ''
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
       onRefreshClick() {
        location.reload();
      },
      logout() {
      localStorage.clear();
      router.push('LoginView')
      },
    },
};
  </script>

<style>
/* .v-navigation-drawer__content {
  overflow-y: auto !important;
}
.v-navigation-drawer__content:is(.rail) {
  overflow-y: hidden !important;
}
.rail {
  overflow-y: auto !important;
} */
.nametag{
  position: inherit;
  float: left;
}
@media (max-width: 767px) {
  .nametag{
    font-size: 0.8rem;
}
.v-list-item--nav .v-list-item-title{
  font-size: 1rem;
}
}
</style>

  