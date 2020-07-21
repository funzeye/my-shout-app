<template>
  <div class="ion-page">
    <ion-header>
          <ion-toolbar>
              <ion-title>Your Profile</ion-title>
          </ion-toolbar>
      </ion-header>
    <ion-content class="ion-padding">
      <ion-text><h2>{{ user.email }}</h2></ion-text>
      <ion-item>
        <ion-button @click="changeEmail">Change Email</ion-button>
      </ion-item>
      <ion-item>
        <ion-button @click="changePassword">Send Password Reset Email</ion-button>
      </ion-item>
      <ion-note class="ion-padding" style="display:block">Clicking 'Reset' will log you out and an email will be sent to the above address</ion-note>

    </ion-content>
  </div>
</template>

<script>

export default {
  name: 'about',
  computed: {
    user () {
      return this.$store.getters.user
    },
    userId () {
      return this.$store.getters.userId
    }
  },
  methods: {
    changeEmail () {
      this.$router.push({ name: 'change-email', params: { userId: this.userId } })
    },
    changePassword () {
      this.$store.dispatch('sendPasswordEmailReset', this.user.email)
    }
  }
}
</script>
