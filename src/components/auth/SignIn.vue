<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Sign In</h1>
      <form @submit.prevent="onSubmit">
        <ion-item class="input">
          <ion-label for="email">Email: <ion-text color="danger">*</ion-text></ion-label>
          <ion-input-vue
                  type="email"
                  id="email"
                  @ionBlur="setEmailLostFocus"
                  v-model="email"
                  @ionFocus="email_not_focused = false"></ion-input-vue>
        </ion-item>
        <ion-note v-if="!$v.email.email && email_not_focused" class="error ion-padding" color="danger">Valid Email Required</ion-note>
        <ion-item class="input">
          <ion-label for="password">Password: <ion-text color="danger">*</ion-text></ion-label>
          <ion-input-vue
                  type="password"
                  id="password"
                  v-model="password"></ion-input-vue>
        </ion-item>
        <div class="ion-padding">
          <ion-button type="submit" :disabled="$v.$invalid">Submit</ion-button>
        </div>
      </form>
      <ion-grid>
      <ion-row class="ion-justify-content-center ion-padding-vertical">
      <ion-router-link href="/#/signup">
        Not signed up? Sign up here
      </ion-router-link>
      </ion-row>
      <ion-row class="ion-justify-content-center ion-padding-top">
      <ion-router-link href="/#/forgotpassword">
        Forgot password?
      </ion-router-link>
      </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      email_not_focused: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      this.$store.dispatch('signin', formData)
    },
    setEmailLostFocus () {
      this.$v.email.$touch(true)
      this.email_not_focused = true
    }
  }
}
</script>
