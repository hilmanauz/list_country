<template>
  <div>
    <div class="d-flex justify-space-between align-center my-2 mb-5" style="width: 100%" v-if="filterCountries.length">
      <span class="text-h3">Search by {{searchKey}}</span>
      <v-btn icon large color="red" @click="removeFilter">
        <v-icon large color="black">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4" v-for="(item, index) in filterCountries.length ? filterCountries : slicedArray" :key="index">
        <v-card @click="goToDetails(item)" v-if="item.status !== 404">
          <v-img
            :src="item.flag"
            height="250px"
          ></v-img>
          <div class="d-flex flex-column align-center pa-3">
            <div class="d-flex align-center mb-3">
              <span class="text-h5 font-weight-black">{{item.name}}</span> &nbsp; 
              <span class="text-h6 text--secondary">({{item.alpha3Code}})</span>
            </div>
            <div class="d-flex" style="width: 100%">
              <v-row>
                <v-col cols="6" class="d-flex flex-column">
                  <span class="text-body-2 font-weight-bold">Capital: <span class="text-description">{{item.capital}}</span></span>
                  <span class="text-body-2 font-weight-bold">Calling Code: <span class="text-description">+{{item.callingCodes.map(e => e).join(", +")}}</span></span>
                  <span class="text-body-2 font-weight-bold">Languages: <span class="text-description">{{item.languages.map(e => e.iso639_1).join(", ").toUpperCase()}}</span></span>
                </v-col>
                <v-col cols="6" class="d-flex flex-column">
                  <span class="text-body-2 font-weight-bold">Region: <span class="text-description">{{item.region}}</span></span>
                  <span class="text-body-2 font-weight-bold">Currencies: <span class="text-description">{{item.currencies.map(e => e.code).join(", ")}}</span></span>
                  <span class="text-body-2 font-weight-bold">Regional Bloc: <span class="text-description">{{item.regionalBlocs.map(e => e.acronym).join(", ")}}</span></span>
                </v-col>
              </v-row>
            </div>
          </div>
          <span
            v-intersect.quiet="() => onIntersect()"
            v-if="index === temp && index != 0"
          ></span>
        </v-card>
        <div class="d-flex justify-center align-center" style="height: 70vh !important" v-else>
          <span class="text-h2">Not Found</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      temp: 21,
      lastIndex: 24,
    }
  },
  async asyncData({store}) {
    if(!store.state.resCountries.length) await store.dispatch('apiCountries')
  },
  methods: {
    removeFilter() {
      this.$store.commit('SET_FILTER_COUNTRIES', [])
    },
    goToDetails(item) {
      this.$router.push(`/country?name=${item.name}`)
    },
    onIntersect() {
      console.log(this.temp, this.lastIndex)
      if (this.temp < this.lastIndex) {
        this.lastIndex += 6
        this.temp = this.lastIndex - 6;
      }
    },
  },
  computed: {
    ...mapState(['resCountries', 'filterCountries', 'searchKey']),
    slicedArray() {
      return this.resCountries.slice(0, this.lastIndex);
    },    
  }
}
</script>
<style scoped>
.text-description {
  font-weight: 400 !important;
}
</style>