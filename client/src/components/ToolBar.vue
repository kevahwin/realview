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
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <SimpleUpload />
        </v-navigation-drawer>
      </v-layout>
    </v-card>
</template>
  
  <script>
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
      }
    },
    methods: {
       onRefreshClick() {
        location.reload();
      },
    },
};
  </script>

<style>
.v-navigation-drawer__content {
  overflow-y: auto !important;
}
.v-navigation-drawer__content:is(.rail) {
  overflow-y: hidden !important;
}
.rail {
  overflow-y: auto !important;
}
</style>

  