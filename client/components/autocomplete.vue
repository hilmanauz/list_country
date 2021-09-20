<template>
<div class="d-flex flex-column align-center">
  <v-autocomplete
    :id="`autocomplete-${index}`"
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    class="mx-4"
    @keyup="goToSearch"
    hide-no-data
    hide-details
    outlined
    :multiple="name === 'List of Country Codes'"
    clearable
    filled
    v-if="label !== 'countryName'"
  ></v-autocomplete>
  <v-text-field
    v-else
    outlined
    hide-details
    filled
    clearable
    v-model="search"
    @keyup="goToSearch"
  >

  </v-text-field>
  <v-btn color="primary" width="220" class="mt-4 mb-2" @click="fetchSearch">
    Search
  </v-btn>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: {
    label: String,
    name: String,
    index: Number,
  },
  data() {
    return {
      search: '',
      loading: false,
      select: '',
      items: [],
      state: [],
    }
  },
  watch: {
    search (val) {
      if (val && val !== this.select && this.label !== 'countryName') {
        return this.querySelections(val)
      } else if (!val && this.name !== 'List of Country Codes') {
        this.items = []
      }
    },
  },
  computed: {
  ...mapState(['names', 'codes', 'currencies', 'languages', 'capitalsCity', 'callingCodes', 'region', 'regionalBloc'])
  },
  methods: {
    querySelections (v) {
      this.loading = true
      if(this.label === 'name') this.state = [...this.names]
      else if(this.label === 'alpha') this.state = [...this.codes]
      else if(this.label === 'currency') this.state = [...this.currencies]
      else if(this.label === 'lang') this.state = [...this.languages]
      else if(this.label === 'capital') this.state = [...this.capitalsCity]
      else if(this.label === 'callingcode') this.state = [...this.callingCodes]
      else if (this.label === 'region') this.state = [...this.region]
      else if (this.label === 'regionalbloc') this.state = [...this.regionalBloc]
      setTimeout(() => {
        this.items = this.state.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    goToSearch(e) {
      if(e.keyCode === 13 && this.select.length && this.name !== 'List of Country Codes') {
        this.fetchSearch()
      } else if (e.keyCode === 13 && this.label === 'countryName') {
        this.fetchSearch()
      }
    },
    fetchSearch() {
      if(this.select.length || this.label === 'countryName') {
        this.$store.commit('SET_SEARCH_KEY', `${this.name}: ${this.select.length ? this.select : this.search}`)
        let slug = ''
        if(this.label === 'countryName') {
          slug = `name/${this.search}`
        } else if (this.name === 'List of Country Codes') {
          slug = `${this.label}?codes=${this.select.join(';')}`
        } else {
          slug = `${this.label}/${this.select}`
        }
        this.$store.dispatch('apiFilterCountries', {slug, label: this.label})
        this.search = ''
        this.$emit('closeExpansion')
      }
    },
  },
}
</script>

<style>

</style>