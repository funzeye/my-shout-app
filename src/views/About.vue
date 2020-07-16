<template>
  <div class="ion-page">
    <ion-header>
          <ion-toolbar>
              <ion-title>Your Profile</ion-title>
          </ion-toolbar>
      </ion-header>
    <ion-content class="ion-padding">
      <h2>{{ user.email }}</h2>
      <p>Coming soon...</p>
    </ion-content>
  </div>
</template>

<script>

export default {
  name: 'about',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
