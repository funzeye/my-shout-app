<template>
  <ion-tabs>
        <ion-tab tab="home" id="home">
          <Home :i="i" />
        </ion-tab>

        <ion-tab tab="about">
          <About />
        </ion-tab>

        <ion-tab tab="create-new">
          <CreateNew />
        </ion-tab>

        <template slot="bottom">
          <ion-tab-bar>
            <ion-tab-button tab="home">
              <ion-icon :src="i.beer"></ion-icon>
              <ion-label>Home</ion-label>
              <ion-badge>6</ion-badge>
            </ion-tab-button>

            <ion-tab-button tab="about">
              <ion-icon :src="i.informationCircle"></ion-icon>
              <ion-label>About</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="create-new">
              <ion-icon :src="i.addCircle"></ion-icon>
              <ion-label>Create New</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </template>
      </ion-tabs>
</template>

<script>
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CreateNew from '../views/CreateNew.vue'

import * as allIcons from 'ionicons/icons'

export default {
  name: 'tab-root',
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    Home,
    About,
    CreateNew
  }
}
</script>
