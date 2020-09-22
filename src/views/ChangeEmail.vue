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
      <ion-grid fixed>
        <ion-row>
          <ion-col size="12" offset-md="3" size-md="6" offset-xl="4" size-xl="4">
            <form @submit.prevent="onSubmit">
              <ion-item lines="none" class="ion-padding-bottom">
                  <ion-label position="stacked">Current Email:</ion-label>
                  <ion-text><b>{{ userDetails.email }}</b></ion-text>
              </ion-item>
              <ion-item lines="none" class="input">
                <ion-label position="stacked" for="email">New Email <ion-text color="danger">*</ion-text></ion-label>
                <ion-input-vue
                        type="email" id="email" inputmode="email"
                        debounce="300" @ionBlur="setEmailLostFocus"
                        v-model="email" @ionFocus="email_not_focused = false"></ion-input-vue>
                <ion-note v-if="!$v.email.email && email_not_focused" class="error ion-padding" color="danger">Valid Email Required</ion-note>
                <ion-note v-if="!$v.email.unique && !$v.email.$pending" class="error ion-padding" color="danger">Email Already Taken</ion-note>
              </ion-item>
              <div class="ion-padding">
                <ion-button type="submit" :disabled="$v.$invalid">Submit</ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from '@/axios-auth'
import * as allIcons from 'ionicons/icons'
import { mapGetters } from 'vuex'

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
      async unique (val) {
        if (val.trim().length === 0) return true
        let isUnique = true
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (emailRegex.test(val)) {
          console.log('is a valid email, checking if unique')

          const response = await axios.post(':createAuthUri?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ', {
            identifier: val,
            continueUri: window.location.href
          })
            .catch((ex) => {
              console.log('error:', ex)
              return true
            })

          console.log('response:', response)
          isUnique = !response.data.registered
        }
        return await Boolean(isUnique)
      }
    }
  },
  computed: {
    ...mapGetters('userModule', [
      'userDetails',
      'userId'
    ])
  },
  methods: {
    onSubmit () {
      const newData = { newEmail: this.email }
      console.log('new email:', newData)
      this.$store.dispatch('userModule/changeEmail', newData)
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
    if (this.userDetails.email === '') {
      this.$store.dispatch('userModule/fetchUserDetails', this.userId)
    }
  }
}
</script>
