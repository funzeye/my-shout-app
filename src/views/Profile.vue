<template>
  <div class="ion-page">
    <ion-header>
          <ion-toolbar>
              <ion-title>Your Profile</ion-title>
              <ion-buttons slot="end">
                <ion-button v-if="isAuthenticated" @click="onLogout">
                  Logout
                </ion-button>
              </ion-buttons>
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
      <ion-note class="ion-padding" style="display:block">Clicking 'Send Password Reset Email' will log you out and an email will be sent to the above address</ion-note>

    </ion-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters('userModule', [
      'userId',
      'user',
      'isAuthenticated'
    ])
  },
  methods: {
    changeEmail () {
      this.$router.push({ name: 'change-email', params: { userId: this.userId } })
    },
    changePassword () {
      this.$store.dispatch('userModule/sendPasswordEmailReset', this.user.email)
    },
    onLogout: function () {
      this.$store.dispatch('userModule/logout')
    }
  }
}
</script>
