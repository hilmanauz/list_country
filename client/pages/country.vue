<template>
  <div>
  <v-card elevation="2" class="my-4 pa-5 py-10">
    <v-row>
      <v-col cols="12" md="2" lg="4" class="py-1">
        <div class="d-flex flex-column align-center justify-center" style="height: 100%">
          <v-img :src="detailCountry.flag" alt="" max-height="250" contain/>
          <div class="d-flex align-center my-3">
            <span class="text-h4 text-md-h5 text-lg-h4 font-weight-black">{{detailCountry.name}}</span> &nbsp; 
            <span class="text-h5 text-md-h6 text-lg-h5 text--secondary">({{detailCountry.alpha3Code}})</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="10" lg="8" class="py-1">
          <v-row>
            <v-col cols="6" class="pb-0">
              <div class="d-flex flex-column">
                <span class="text-lg-h5 text-md-h5">Capital: <span v-bind:style="{ fontSize: propText, fontWeight: 'bold' }">{{detailCountry.capital}}</span></span>
                <span class="text-lg-h5 text-md-h5">{{propRegion}}: <span v-bind:style="{ fontSize: propText, fontWeight: 'bold' }">{{detailCountry.region}}</span></span>
                <span class="text-lg-h5 text-md-h5">{{propSubregion}}: <span v-bind:style="{ fontSize: propText, fontWeight: 'bold' }">{{detailCountry.subregion}}</span></span>
              </div>
            </v-col>
            <v-col cols="6" class="pb-0">
              <div class="d-flex flex-column">
                <span class="text-lg-h5 text-md-h5">Population: <span v-bind:style="{ fontSize: propText, fontWeight: 'bold' }">{{detailCountry.population.toLocaleString('id')}}</span></span>
                <span class="text-lg-h5 text-md-h5">Area: <span v-bind:style="{ fontSize: propText, fontWeight: 'bold' }">{{detailCountry.area.toLocaleString('id')}} km <sup>2</sup></span></span>
                <span class="text-lg-h5 text-md-h5">Lat-Long: <span v-bind:style="{ fontSize: propText, fontWeight: 'bold' }">{{detailCountry.latlng.join(', ')}}</span></span>
              </div>
            </v-col>
            <CustomChip :data="detailCountry.languages" type="Languages" />
            <CustomChip :data="detailCountry.currencies" type="Currencies" />
            <CustomChip :data="detailCountry.timezones" type="Timezones" />
            <CustomChip :data="detailCountry.callingCodes" type="Calling Codes" />
            <CustomChip :data="detailCountry.regionalBlocs" type="Regional Blocs" />
          </v-row>
      </v-col>
    </v-row>
  </v-card>
  <div class="my-6">
    <span class="text-h5 font-weight-bold">&emsp; &ensp; More Countries</span>
    <v-slide-group show-arrows class="mt-2" center-active>
      <v-slide-item
        v-for="(item, index) in countrySuggestion"
        :key="(index)"    
        v-slot="{ toggle }"
      >
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card elevation="0" class="mx-2" @click="goToDetails(item)" @click.native="toggle">
          <v-img :src="item.flag" :max-width="propWidthImageRecommendation" :height="propHeightImageRecommendation" contain>
            <v-slide-y-reverse-transition>
              <div class="card-hover-info" v-if="hover" open-delay="100">
                  <v-card tile elevation="0" height="35" width="100%" style="background: rgba(255,255,255,0.8);">
                    <div class="d-flex justify-space-between px-2 my-1">
                      <span class="text-body-1">{{item.capital}}</span>
                      <span class="text-body-1">{{item.subregion}}</span>
                    </div>
                  </v-card>
              </div>
            </v-slide-y-reverse-transition>
          </v-img>
          <div class="d-flex justify-space-between">
            <span class="text-body-1 font-weight-bold title-recommendation">{{item.name}}</span>
            <span class="text-body-1">{{item.alpha3Code}}</span>
          </div>
        </v-card>
      </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  async asyncData({route, store}) {
    await store.dispatch('apiDetailCountry', {name: route.query.name})
  },
  watch: {
    '$route.query'() {
      this.$store.dispatch('apiDetailCountry', {name: this.$route.query.name})
    }
  },
  computed: {
    propText() {
      if(this.$vuetify.breakpoint.name === 'xs') return '15px'
      else return '22px'
    },
    propRegion() {
      if(this.$vuetify.breakpoint.name === 'xs') return 'Reg'
      else return 'Region'
    },
    propSubregion() {
      if(this.$vuetify.breakpoint.name === 'xs') return 'Sub-Reg'
      else return 'Sub-Region'
    },
    propWidthImageRecommendation() {
      if(this.$vuetify.breakpoint.name === 'xs') return '200'
      else return '300'
    },
    propHeightImageRecommendation() {
      if(this.$vuetify.breakpoint.name === 'xs') return '120'
      else return '200'
    },
    ...mapState(['countrySuggestion', 'detailCountry'])
  },
  methods: {
    goToDetails(item) {
      this.$router.push({path: '/country', query: { name: item.name}})
    }
  }
}
</script>

<style>
.card-hover-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.title-recommendation {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>