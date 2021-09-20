<template>
  
  <v-snackbar v-if="alertData.detail" class="pb-1" :rounded="'lg'" text outlined
    v-model="snackbar"
    :color="propColor"
    :timeout="timeout"
    :width="propWidth"
  >
    <v-icon size=20 :color="propColor" style="vertical-align:top">
      {{propIcon}}
    </v-icon>
    <span class="px-1" style="vertical-align:bottom">{{ alertData.detail }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn icon small
        v-bind="attrs"
        @click="snackbar = false"
      >
        <v-icon :color="propColor" class="px-1">
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      snackbar: true,
      timeout: 3000,
    }
  },
  computed: {
    ...mapState([
      'alertData',
    ]),
    propWidth() {
      if (this.$vuetify.breakpoint.name == 'xs') return '100%'
      return 'auto'
    },
    propIcon() {
      if (this.alertData.type == 'success') return 'mdi-check-circle-outline'
      else if (this.alertData.type == 'info') return 'mdi-information-outline'
      return 'mdi-circle-outline'
    },
    propColor() {
      if (this.alertData.type == 'info') return 'tertiary'
      return this.alertData.type
    }
  },
  watch: {
    snackbar(newValue, oldValue) {
      if (newValue == false) this.$store.commit('CLEAR_ALERT_DATA')
    },
    alertData(newValue, oldValue) {
      if (newValue.detail) {
        if (newValue.detail) this.snackbar = true  
      }
    },
  }
}
</script>

<style>

</style>