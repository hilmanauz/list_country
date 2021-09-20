<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <Nuxt />
        <v-scale-transition origin="bottom center 0">
          <Snackbar />
        </v-scale-transition>
      </v-container>
    </v-main>
    
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>