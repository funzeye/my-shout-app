<template>
  <div class="ion-page">
  <ion-tabs>
        <!--<ion-tab tab="search-for-pub" id="search-for-pub">
          <SearchForPub :i="i"/>
        </ion-tab>-->

        <ion-tab tab="search-for-pub" :routes="['search-for-pub', 'pub-details']" :to="{name:'search-for-pub'}">
          <ion-vue-router name="searchRoute"></ion-vue-router>
        </ion-tab>

        <ion-tab tab="booked-tables" id="booked-tables">
          <BookedTables :i="i"/>
        </ion-tab>

        <ion-tab tab="about" id="about">
          <About />
        </ion-tab>

        <template slot="bottom">
          <ion-tab-bar>

            <ion-tab-button tab="search-for-pub">
              <ion-icon :src="i.search"></ion-icon>
              <ion-label>Search</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="booked-tables">
              <ion-icon :src="i.beer"></ion-icon>
              <ion-label>Booked</ion-label>
              <!--<ion-badge>6</ion-badge>-->
            </ion-tab-button>

            <ion-tab-button tab="about">
              <ion-icon :src="i.person"></ion-icon>
              <ion-label>Profile</ion-label>
            </ion-tab-button>

          </ion-tab-bar>
        </template>
      </ion-tabs>
    </div>
</template>

<script>
// import SearchForPub from '../views/SearchForPub.vue'
import About from '../views/About.vue'
import BookedTables from '../views/BookedTables.vue'

import * as allIcons from 'ionicons/icons'

export default {
  name: 'tab-root',
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    // SearchForPub,
    About,
    BookedTables
  }
}
</script>
