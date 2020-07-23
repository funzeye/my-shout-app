<template>
    <div class="ion-page">
    <ion-header>
          <ion-toolbar>
              <ion-title>Change Email</ion-title>
              <ion-buttons slot="start">
                <ion-button @click="backToProfile">
                    <ion-icon :src="i.arrowBack"></ion-icon>
                </ion-button>
              </ion-buttons>
          </ion-toolbar>
      </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="onSubmit">
        <ion-item class="ion-padding-bottom">
            <ion-label position="stacked">Current Email:</ion-label>
            <ion-text>{{ user.email }}</ion-text>
        </ion-item>
        <ion-item class="input">
          <ion-label position="stacked" for="email">New Email <ion-text color="danger">*</ion-text></ion-label>
          <ion-input-vue
                  type="email"
                  id="email"
                  debounce="300"
                  @ionBlur="setEmailLostFocus"
                  v-model="email"
                  @ionFocus="email_not_focused = false"></ion-input-vue>
        </ion-item>
        <ion-note v-if="!$v.email.email && email_not_focused" class="error ion-padding" color="danger">Valid Email Required</ion-note>
        <ion-note v-if="!$v.email.unique" class="error ion-padding" color="danger">Email Already Taken</ion-note>
        <div class="ion-padding">
          <ion-button type="submit" :disabled="$v.$invalid">Submit</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from '@/axios-auth'
import * as allIcons from 'ionicons/icons'

export default {
  name: 'change-email',
  data () {
    return {
      email: '',
      email_not_focused: false,
      i: allIcons
    }
  },
  validations: {
    email: {
      required,
      email,
      unique: val => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailRegex.test(val)) {
          if (val === '') {
            return true
          }
          return axios.post(':createAuthUri?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ', {
            identifier: val,
            continueUri: window.location.href
          })
            .then(response => {
              // console.log(response)
              return !response.data.registered
            }
            )
            .catch((ex) => {
              // console.log('error:', ex)
              return true
            }
            )
        }
        return true
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userId () {
      return this.$store.getters.userId
    }
  },
  methods: {
    onSubmit () {
      const newData = { newEmail: this.email }
      console.log('new email:', newData)
      this.$store.dispatch('changeEmail', newData)
      this.email = ''
    },
    setEmailLostFocus () {
      console.log('email lost focus')
      this.$v.email.$touch(true)
      this.email_not_focused = true
    },
    backToProfile () {
      this.$router.replace({ name: 'profile' })
    }
  },
  created () {
    if (this.user.email === '') {
      this.$store.dispatch('fetchUserDetails', this.userId)
    }
  }
}
</script>
