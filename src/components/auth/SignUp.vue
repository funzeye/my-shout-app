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
          <ion-label for="email">Mail</ion-label>
          <ion-input-vue
                  type="email"
                  id="email"
                  v-model="email"></ion-input-vue>
        </ion-item>
        <ion-item class="input">
          <ion-label for="password">Password</ion-label>
          <ion-input-vue
                  type="password"
                  id="password"
                  v-model="password"></ion-input-vue>
        </ion-item>
        <ion-item class="input">
          <ion-label for="confirm-password">Confirm Password</ion-label>
          <ion-input-vue
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword"></ion-input-vue>
        </ion-item>

        <ion-item class="input">
          <ion-label>Accept Terms of Use</ion-label>
          <ion-checkbox slot="start" color="primary" id="terms" v-model="terms"></ion-checkbox>
        </ion-item>

        <div class="ion-padding">
          <ion-button type="submit">Submit</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        terms: this.terms
      }
      console.log(formData)
      this.$store.dispatch('signup', formData)
    }
  }
}
</script>
