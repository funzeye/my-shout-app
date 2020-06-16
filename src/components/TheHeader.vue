<template>
  <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
        <ion-buttons slot="end">
        <ion-button v-if="auth" @click="onLogout">
          Logout
        </ion-button>
        </ion-buttons>
        <ion-router-link href="/signup" v-if="!auth" slot="end">
          Sign Up
        </ion-router-link>
        <ion-router-link href="/signin" v-if="!auth" slot="end">
          Login
        </ion-router-link>
      </ion-toolbar>
    </ion-header>
</template>

<script>
export default {
  methods: {
    onLogout: function () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
