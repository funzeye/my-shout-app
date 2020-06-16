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
      password: ''
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
    }
  }
}
</script>
