<template>
    <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Create New Pub</h1>
      <PubDetailsForm mode="create"/>

      <ion-list>
        <ion-item v-for="p in pubs" :key="p['.key']">
          <ion-label>Pub Name: {{ p.pubName }}</ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import PubDetailsForm from '../components/PubDetailsForm.vue'

export default {

  components: {
    TheHeader,
    PubDetailsForm
  },
  computed: {
    pubs () {
      return this.$store.getters.pubs
    }
  }
}
</script>
