<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Create New Pub Floor Area</h1>

      <form @submit.prevent="submitted">
        <ion-item>
            <ion-label position="stacked">Pub Floor Area Name <ion-text color="danger">*</ion-text></ion-label>
            <ion-input-vue type="text" placeholder="e.g. Lounge" clear-input name="pubFloorArea" v-model="pubFloorArea.name"></ion-input-vue>
        </ion-item>

        <div class="ion-padding">
            <ion-button expand="block" class="ion-no-margin" type="submit">Create Pub Floor Area</ion-button>
        </div>
      </form>

      <ion-list>
        <ion-item v-for="pfa in pubFloorAreas" :key="pfa['.key']">
          <ion-label>Area Name: {{ pfa.name }}</ion-label>
          <ion-button fill="clear" shape="round">
            <ion-icon :src="i.closeCircle" slot="icon-only" name="star"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import * as allIcons from 'ionicons/icons'

export default {
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    TheHeader
  },
  computed: {
    pubFloorAreas () {
      return this.$store.getters.pubFloorAreas
    },
    pubFloorArea: {
      get () {
        return this.$store.getters.pubFloorArea
      },
      set (pubFloorArea) {
        this.$store.dispatch('updatePubFloorArea', pubFloorArea)
      }
    }
  },
  methods: {
    submitted () {
      var newPubFloorArea = this.pubFloorArea
      console.log('submitted new pub floor area details:')
      console.log(newPubFloorArea)

      this.$store.dispatch('storePubFloorArea', newPubFloorArea)
    }
  },
  created () {
    this.$store.dispatch('fetchPubFloorAreas')
  }
}
</script>
