<template>
  <ion-tabs>
        <ion-tab tab="pub-details" id="pub-details">
          <PubDetails :i="i"/>
        </ion-tab>

        <ion-tab tab="about">
          <About />
        </ion-tab>

        <template slot="bottom">
          <ion-tab-bar>
            <ion-tab-button tab="pub-details">
              <ion-icon :src="i.beer"></ion-icon>
              <ion-label>Pub</ion-label>
              <ion-badge>6</ion-badge>
            </ion-tab-button>

            <ion-tab-button tab="about">
              <ion-icon :src="i.informationCircle"></ion-icon>
              <ion-label>About</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </template>
      </ion-tabs>
</template>

<script>
import PubDetails from '../views/PubDetails.vue'
import About from '../views/About.vue'

import * as allIcons from 'ionicons/icons'

export default {
  name: 'tab-root',
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    PubDetails,
    About
  }
}
</script>
