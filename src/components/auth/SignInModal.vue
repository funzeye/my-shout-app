<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <sign-in-form :modalCloseParent="modalClose" :isModal="true"></sign-in-form>
    </ion-content>
  </div>
</template>

<script>
import SignInForm from './SignInForm'

export default {
  name: 'modal',
  components: {
    SignInForm
  },
  methods: {
    modalClose: function () {
      this.$ionic.modalController.dismiss()
    }
  }
}
</script>
