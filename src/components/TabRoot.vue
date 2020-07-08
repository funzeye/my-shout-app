<template>
  <ion-tabs>
        <ion-tab tab="search-for-pub" id="search-for-pub">
          <SearchForPub :i="i"/>
        </ion-tab>

        <ion-tab tab="about" id="about">
          <About />
        </ion-tab>

        <template slot="bottom">
          <ion-tab-bar>
            <ion-tab-button tab="search-for-pub">
              <ion-icon :src="i.beer"></ion-icon>
              <ion-label>Search</ion-label>
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
import SearchForPub from '../views/SearchForPub.vue'
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
    SearchForPub,
    About
  }
}
</script>
