export const state = () => ({
  userLog: {},
  resCountries: [],
  filterCountries: [],
  countrySuggestion: [],
  searchKey: '',
  names: [],
  codes: [],
  currencies: [],
  languages: [],
  capitalsCity: [],
  callingCodes: [],
  detailCountry: {},
  region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
  regionalBloc: ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'],
  alertData: { detail: '', type: '' },
  access_token: '',
})

export const mutations = {
  SET_RES_COUNTRIES(state, payload) {state.resCountries = payload},
  SET_USER_LOG(state, payload) {state.userLog = payload},
  SET_DETAIL_COUNTRY(state, payload) {state.detailCountry = payload},
  SET_COUNTRY_SUGGESTION(state, payload) {state.countrySuggestion = payload},
  SET_FILTER_COUNTRIES(state, payload) {state.filterCountries = payload},
  SET_SEARCH_KEY(state, payload) {state.searchKey = payload},
  SET_NAMES(state, payload) {state.names = payload},
  SET_CODES(state, payload) {state.codes = payload},
  SET_CURRENCIES(state, payload) {state.currencies = payload},
  SET_LANGUAGES(state, payload) {state.languages = payload},
  SET_CAPITALS_CITY(state, payload) {state.capitalsCity = payload},
  SET_CALLING_CODES(state, payload) {state.callingCodes = payload},
  SET_ALERT_DATA(state, payload) {state.alertData = payload},
  CLEAR_ALERT_DATA(state) {state.alertData = { detail: '', type: '' } },
  SET_ACCESS_TOKEN(state, payload) {state.access_token = payload}
}

export const actions = {
  async apiCountries({state, commit}) {
    const {data} = await this.$axios.get('/country/all', {
      headers: {
        access_token: state.access_token
      }
    })
    commit('SET_RES_COUNTRIES', data.resCountries)
    console.log('ALL DATA COUNTRY', data.resCountries)
    commit('SET_NAMES', data.names)
    console.log('GET NAMES FOR SUGGESTION SEARCH', data.names)
    commit('SET_CODES', data.codes)
    console.log('GET CODES FOR SUGGESTION SEARCH', data.codes)
    commit('SET_CURRENCIES', data.currencies)
    console.log('GET CURRENCIES FOR SUGGESTION SEARCH', data.currencies)
    commit('SET_LANGUAGES', data.languages)
    console.log('GET LANGUAGES FOR SUGGESTION SEARCH', data.languages)
    commit('SET_CAPITALS_CITY', data.capitalsCity)
    console.log('GET CAPITAL CITY FOR SUGGESTION SEARCH', data.capitalsCity)
    commit('SET_CALLING_CODES', data.callingCodes)
    console.log('GET CALLING CODES FOR SUGGESTION SEARCH', data.callingCodes)
  },
  async apiFilterCountries({state, commit}, payload) {
    try {
      let {data} = await this.$axios.post('/country/filter', {slug: payload.slug}, {
        headers: {
          access_token: state.access_token
        }
      })
      console.log(data, `FILTER DATA WITH KEY: ${state.searchKey}`)
      commit('SET_FILTER_COUNTRIES', data)
    } catch (error) {
      commit('SET_FILTER_COUNTRIES', [{status: 404}])
    }
  },
  async apiDetailCountry({state, commit}, payload) {
    try {
      const {data} = await this.$axios.post('/country/detail', {name: payload.name}, {
        headers: {
          access_token: state.access_token
        }
      })
      commit('SET_DETAIL_COUNTRY', data)
      console.log('GET DETAIL COUNTRY BASED ON QUERY', data)
      let allCountry = null
      if (state.resCountries.length) {
        allCountry = [...state.resCountries]
      } else {
        const {data} = await this.$axios.get('/country', {
          headers: {
            access_token: state.access_token
          }
        })
        allCountry = data
      }
      const randomPickCountries = []
      for(let i = 0; i < 11; i++) {
        let randomIndexCountry = Math.floor(Math.random()* allCountry.length);
        randomPickCountries.push(allCountry[randomIndexCountry])
        allCountry.splice(randomIndexCountry, 1)
      }
      commit('SET_COUNTRY_SUGGESTION', randomPickCountries)
      console.log('GET RANDOM SUGGESTION COUNTRY', randomPickCountries)
    } catch (error) {
    }
  }
}