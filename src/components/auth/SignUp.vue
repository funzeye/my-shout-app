<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Sign Up</h1>
      <form @submit.prevent="onSubmit">
        <ion-item class="input">
          <ion-label for="firstName">First name</ion-label>
          <ion-input-vue
                  type="text"
                  id="firstName"
                  v-model="firstName"></ion-input-vue>
        </ion-item>
        <ion-item class="input">
          <ion-label for="surname">Surname</ion-label>
          <ion-input-vue
                  type="text"
                  id="surname"
                  v-model="surname"></ion-input-vue>
        </ion-item>
        <ion-item>
        <ion-label>I'm a: <ion-text color="danger">*</ion-text></ion-label>
        <ion-select-vue @blur="$v.userRole.touch()" interface="alert" placeholder="Publican or Punter" name="userRole" v-model="userRole">
            <ion-select-option value="punter">Punter</ion-select-option>
            <ion-select-option value="publican">Publican</ion-select-option>
        </ion-select-vue>
        <ion-note v-if="!$v.userRole" class="error ion-padding" color="danger">required</ion-note>
      </ion-item>
        <ion-item class="input">
          <ion-label for="email">Email</ion-label>
          <ion-input-vue
                  type="email"
                  id="email"
                  @blur="$v.email.touch()"
                  v-model="email"></ion-input-vue>
        </ion-item>
        <ion-note v-if="!$v.email.email" class="error ion-padding" color="danger">Valid Email Required</ion-note>

        <ion-item class="input">
          <ion-label for="password">Password</ion-label>
          <ion-input-vue
                  type="password"
                  id="password"
                  @blur="$v.password.touch()"
                  v-model="password"></ion-input-vue>
        </ion-item>
        <ion-note v-if="!$v.password.minLen" class="error ion-padding" color="danger">Must be at least 6 characters long</ion-note>

        <ion-item class="input">
          <ion-label for="confirm-password">Confirm Password</ion-label>
          <ion-input-vue
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.touch()"
                  v-model="confirmPassword"></ion-input-vue>
        </ion-item>
        <ion-note v-if="!$v.confirmPassword.sameAs" class="error ion-padding" color="danger">Passwords do not match</ion-note>

        <ion-item class="input">
          <ion-label>Accept Terms of Use</ion-label>
          <ion-checkbox slot="start" color="primary" id="terms" v-model="terms"></ion-checkbox>
        </ion-item>

        <div class="ion-padding">
          <ion-button type="submit" :disabled="$v.$invalid">Submit</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      userRole: '',
      terms: false
    }
  },
  validations: {
    email: {
      required,
      email
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
        userRole: this.userRole
      }
      console.log(formData)
      this.$store.dispatch('signup', formData)
    }
  }
}
</script>

<style scoped>

</style>
