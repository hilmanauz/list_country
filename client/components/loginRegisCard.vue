<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation >
    <v-card v-bind="propFlat" class="px-2 pt-4 pb-5 px-sm-6 py-sm-6 rounded-lg transparent-card text-center">

      <img src="/countrypedia.webp" alt="country" width="230px" v-if="type === 'login'"/>
      <!-- Header -->
      <p class="text-h5 font-weight-medium text-center pb-2">
        {{type === "login" ? 'Sign in to Countrypedia' : 'Create New User'}}
      </p>

      <!-- Text Fields -->
      <div class="text-body-1">
        <!-- Username/email -->
        <v-text-field outlined dense required 
        label="Username"
        v-model="username"
        :rules="rulesUsername"
        @keyup.enter="type === 'login' ? onClickSignIn() : onClickRegister()"
        ></v-text-field>
        <!-- Password -->
        <v-text-field outlined dense required 
        label="Password"
        v-model="password"
        :rules="rulesPassword"
        @keyup.enter="type === 'login' ? onClickSignIn() : onClickRegister()"
        type="password"
        ></v-text-field>
      </div>       
      
      <!-- Submit Button -->
      <v-btn color="primary" elevation="0" block height=40 @click="type === 'login' ? onClickSignIn() : onClickRegister()">
        {{type === 'login' ? 'Sign In' : 'Submit'}}
      </v-btn>
      
    </v-card>
  </v-form>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: {
    type: String,
  },
  data() {
    return {
      valid: true,

      // Form data variables
      username: '',
      password: '',

      // Forms validation rules
      rulesPassword: [(v) => !!v || 'Password is required'],
      rulesUsername: [(v) => !!v || 'Username is required', (v) => (v.length > 2) || 'Please enter a valid username',],
    }
  },
  computed: {
    propFlat() {
      const flat = {xs: 'flat', sm: 'outlined', md: 'outlined', lg: 'outlined', xl: 'outlined'}[this.$vuetify.breakpoint.name];
      return flat ? { [flat]: true } : {}
    },
    ...mapState(['access_token'])
  },
  methods: {
    validate() {
      return this.$refs.loginForm.validate()
    },
    async onClickSignIn() {
      try {
        const {data} = await this.$axios.post('/login', {username: this.username, password: this.password})
        console.log('LOGIN SUCCESS AND GET ACCESS TOKEN FOR AUTHORIZATION', data.access_token)
        this.$cookies.set('access_token', data.access_token, {path: '/'})
        this.$router.push('/')
        this.$store.commit('SET_ALERT_DATA', {detail: `Welcome Back ${data.username}`, type: 'success'} )
      } catch (error) {
        console.log('LOGIN ERROR AND GET ERROR NOTIFICATION')
        this.$store.commit('SET_ALERT_DATA', {detail: 'Incorrect user or password.', type: 'error'} )
      }
    },
    async onClickRegister() {
      try {
        await this.$axios.post('/register/user', {username: this.username, password: this.password}, {
            headers: {
            access_token: this.access_token
          }
        })
        console.log('SUCCESS CREATE NEW USER')
        this.$store.commit('SET_ALERT_DATA', {detail: `${this.username} has been created`, type: 'success'})
        this.$emit('closeDialog')
      } catch (error) {
        console.log('ERROR CREATE NEW USER BECAUSE AUTHORIZATION ADMIN')
        this.$store.commit('SET_ALERT_DATA', {detail: 'You are not an Admin', type: 'error'} )
      }
    }

  },

}
</script>

<style>

</style>