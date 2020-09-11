<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12" offset-md="3" size-md="6" offset-xl="4" size-xl="4">
            <h1 class="ion-padding-start">Sign Up</h1>
            <form @submit.prevent="onSubmit">
              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="firstName">First name <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="text"
                        id="firstName"
                        @ionBlur="$v.firstName.$touch(true)"
                        v-model="firstName"></ion-input-vue>
                <ion-note v-if="$v.firstName.$invalid && $v.firstName.$dirty" class="error ion-padding" color="danger">Valid name required</ion-note>
              </ion-item>
              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="surname">Surname <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="text"
                        inputmode="text"
                        id="surname"
                        @ionBlur="$v.surname.$touch(true)"
                        v-model="surname"></ion-input-vue>
                <ion-note v-if="$v.surname.$invalid && $v.surname.$dirty" class="error ion-padding" color="danger">Valid name required</ion-note>
              </ion-item>

              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="phone">Phone <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="tel"
                        inputmode="tel"
                        id="phone"
                        @ionBlur="$v.phone.$touch(true)"
                        v-model="phone"></ion-input-vue>
                <ion-note v-if="$v.phone.$invalid && $v.phone.$dirty" class="error ion-padding" color="danger">Valid number required</ion-note>
              </ion-item>

              <ion-item lines="none">
                <ion-label position="stacked">I'm a: <ion-text color="danger">*</ion-text></ion-label>
                <ion-select-vue @ionBlur="$v.userRole.$touch(true)" interface="action-sheet" placeholder="Publican or Patron" name="userRole"
                v-model="userRole">
                  <ion-select-option value="punter">Patron / Pub goer</ion-select-option>
                  <ion-select-option value="publican">Publican</ion-select-option>
                </ion-select-vue>
                <ion-note v-if="$v.userRole.$invalid && $v.userRole.$dirty" class="error ion-padding" color="danger">required</ion-note>
              </ion-item>
              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="email">Email <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="email"
                        inputmode="email"
                        id="email"
                        debounce="300"
                        @ionBlur="setEmailLostFocus"
                        v-model="email"
                        @ionFocus="email_not_focused = false"></ion-input-vue>
                <ion-note v-if="!$v.email.email && email_not_focused" class="error ion-padding" color="danger">Valid Email Required</ion-note>
                <ion-note v-if="!$v.email.notUnique" class="error ion-padding" color="danger">Email Already Taken</ion-note>
              </ion-item>
              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="password">Password <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="password"
                        id="password"
                        @ionBlur="$v.password.$touch(true)"
                        v-model="password"></ion-input-vue>
                <ion-note v-if="!$v.password.minLen" class="error ion-padding" color="danger">Must be at least 6 characters long</ion-note>
              </ion-item>
              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="confirm-password">Confirm Password <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="password"
                        id="confirm-password"
                        @ionBlur="$v.confirmPassword.$touch(true)"
                        v-model="confirmPassword"></ion-input-vue>
                <ion-note v-if="!$v.confirmPassword.sameAs && $v.password.$dirty" class="error ion-padding" color="danger">Passwords do not match</ion-note>
              </ion-item>

              <!--<ion-item class="input">
                <ion-label>Accept Terms of Use</ion-label>
                <ion-checkbox slot="start" color="primary" id="terms" v-model="terms"></ion-checkbox>
              </ion-item>-->

              <div class="ion-padding">
                <ion-button type="submit" :disabled="$v.$invalid">Submit</ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-row class="ion-justify-content-center ion-padding-top">
      <ion-router-link href="/#/signin">
        Already have an account? Sign In
      </ion-router-link>
      </ion-row>
    </ion-content>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import axios from '@/axios-auth'

export default {
  data () {
    return {
      firstName: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      userRole: '',
      terms: false,
      email_not_focused: false
    }
  },
  validations: {
    email: {
      required,
      email,
      notUnique (val) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailRegex.test(val)) {
          console.log('is a valid email, checking if unique')

          return axios.post(':createAuthUri?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ', {
            identifier: val,
            continueUri: window.location.href
          })
            .then(response => {
              console.log('response:', response)
              return !response.data.registered
            })
            .catch((ex) => {
              console.log('error:', ex)
              return true
            })
        }
        return true
      }
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    },
    userRole: {
      required
    },
    firstName: {
      required,
      minLen: minLength(2)
    },
    surname: {
      required,
      minLen: minLength(2)
    },
    phone: {
      required
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        terms: this.terms,
        firstName: this.firstName,
        surname: this.surname,
        userRole: this.userRole,
        phone: this.phone
      }
      console.log(formData)
      this.$store.dispatch('userModule/signup', formData)
    },
    setEmailLostFocus () {
      console.log('email lost focus')
      this.$v.email.$touch(true)
      this.email_not_focused = true
    }
  }
}
</script>

<style scoped>

</style>
