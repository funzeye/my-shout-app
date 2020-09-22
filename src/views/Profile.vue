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
      <img id="profile-img" height="200px" width="200px"/>
      <ion-text><h2 style="padding-left:16px">{{ userDetails.email }}</h2></ion-text>
      <ion-item lines="none">
         <ion-button style="margin-bottom:16px" @click="changeEmail">Change Email</ion-button>
      </ion-item>
      <ion-item lines="none">
        <ion-button style="margin-top:16px; margin-bottom: 16px" @click="changePassword">Send Password Reset Email</ion-button>
      </ion-item>
      <ion-text class="ion-padding" style="display:block; font-size:12px">Clicking 'Send Password Reset Email' will log you out and an email will be sent to the above address</ion-text>

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
      'userPhotoUrl',
      'userDetails',
      'isAuthenticated'
    ])
  },
  mounted () {
    this.downloadProfilePic()
  },
  methods: {
    changeEmail () {
      this.$router.push({ name: 'change-email', params: { userId: this.userId } })
    },
    changePassword () {
      this.$store.dispatch('userModule/sendPasswordEmailReset', this.userDetails.email)
    },
    onLogout: function () {
      this.$store.dispatch('userModule/logout')
    },
    downloadProfilePic: function () {
      var img = document.getElementById('profile-img')
      // console.log('img:', img)
      // console.log(this.userPhotoUrl)
      img.src = this.userPhotoUrl
    }
  }
}
</script>
