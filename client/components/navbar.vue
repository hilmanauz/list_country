<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      right
      fixed
      disable-resize-watcher	
      app
    >
    <v-list class="pa-3 font-weight-bold"> Search Parameter</v-list>
      <v-expansion-panels accordion flat v-model="panels">
        <v-expansion-panel
          v-for="(item, index) in items"
          :key="index"
        >
          <v-expansion-panel-header class="font-weight-medium">{{item.name}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <Autocomplete :data="item.data" :label="item.label" :name="item.name" :index="index" :lastIndex="lastIndex" @closeExpansion="closeExpansion"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <v-app-bar
      clipped-right
      fixed
      app
      elevate-on-scroll
      v-show="isAuth"
    >
      <img src="/countrypedia.webp" alt="country" width="55px"/>
      <v-toolbar-title v-text="title" class="font-weight-bold clickable" @click="goToHome"/>
      <v-spacer></v-spacer>
      
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            class="mx-3"
            elevation="0"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-2">
              mdi-account
            </v-icon>
            Hi, {{userLog.username}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item link v-if="userLog.role === 'admin'" @click="dialog = true">
            <v-list-item-title>Create User</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
     <LoginRegisCard type="register" @closeDialog="closeDialog"/>
    </v-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import jwt_decode from "jwt-decode";
export default {
  data () {
    return {
      drawer: false,
      lastIndex: null,
      dialog: false,
      panels: [],
      items: [ 
      {
        name: 'Country Name',
        label: 'countryName',
      }, 
      {
        name: 'Country Full Name', 
        label: 'name',
      },
      {
        name: 'Country Code', 
        label: 'alpha',
      }, 
      {
        name: 'List of Country Codes', 
        label: 'alpha',
      },
      {
        name: 'Currency',
        label: 'currency',
      },
      {
        name: 'Language', 
        label: 'lang',
      },
      {
        name: 'Capital City', 
        label: 'capital',
      }, 
      {
        name: 'Calling Code', 
        label: 'callingcode',
      },
      {
        name: 'Region', 
        label: 'region',
      },
      {
        name: 'Regional Bloc',
        label: 'regionalbloc',
      }
      ],
      title: 'Countrypedia'
    }
  },
  methods: {
    closeExpansion() {
      this.panels = []
      if(this.$vuetify.breakpoint.name !== 'lg' || this.$vuetify.breakpoint.name !== 'xl') this.drawer = false
      this.$router.push('/')
    },
    goToHome() {
      this.$router.push('/')
    },
    signOut() {
      this.$cookies.remove('access_token')
      this.drawer = false
      this.$store.commit('SET_USER_LOG', {})
      this.$router.push('/login')
    },
    closeDialog() {
      this.dialog = false
    }
  },
  computed: {
    ...mapState(['userLog', 'access_token']),
    isAuth() {
      if(this.$route.path === '/login') return false
      else if(this.$route.path === '/' || this.$route.path === '/country') return true
    },
  },
  created() {
    if(this.$route.path === '/' || this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl') this.drawer = true
    if(this.access_token.length) {
      const decoded = jwt_decode(this.access_token);
      this.$store.commit('SET_USER_LOG', decoded)
    }
  },
  watch: {
    $route(to, from) {
      if(to.path === '/country' || to.path === '/login') this.drawer = false
      else {
        if(this.$vuetify.breakpoint.name === 'lg' || this.$vuetify.breakpoint.name === 'xl') this.drawer = true
      }
      if(this.access_token.length) {
        const decoded = jwt_decode(this.access_token);
        this.$store.commit('SET_USER_LOG', decoded)
      }
    },
  }
}
</script>

<style>
.v-expansion-panel-content__wrap {
    padding: 0 !important;
}
</style>