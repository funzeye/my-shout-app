<template>
    <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Add Table Details for {{ pub.pubName }}</h1>

      <form @submit.prevent="submitted">

      <div class="ion-padding">
        <ion-button expand="block" class="ion-no-margin" type="submit">Save Table Details</ion-button>
      </div>

      <div class="ion-padding">
        <ion-button expand="block" class="ion-no-margin" type="submit" color="secondary">Skip For Now</ion-button>
      </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
    pub: {
      get () {
        return this.$store.getters.pub
      },
      set (pub) {
        this.$store.dispatch('updatePub', pub)
      }
    }
  }
}
</script>
