<template>
  <div class="ion-page">
  <ion-tabs>

        <ion-tab tab="search-for-pub" :routes="['search-for-pub', 'pub-details', 'reserve-table', 'edit-pub',
        'edit-pub-tables', 'edit-table-details', 'edit-pub-details', 'add-pub-photo']">
          <ion-vue-router name="searchRoute"></ion-vue-router>
        </ion-tab>

        <ion-tab tab="booked-tables" :routes="['booked-tables']" id="booked-tables">
          <ion-vue-router name="bookedTablesRoute"></ion-vue-router>
        </ion-tab>

        <ion-tab tab="profile" :routes="['profile', 'change-email', 'edit-user-details']" id="profile">
          <ion-vue-router name="profileRoute"></ion-vue-router>
        </ion-tab>

        <template slot="bottom">
          <ion-tab-bar>

            <ion-tab-button tab="search-for-pub" :to="{name:'search-for-pub'}">
              <ion-icon :src="i.home"></ion-icon>
              <ion-label>Pub</ion-label>
            </ion-tab-button>

            <ion-tab-button v-if="auth" tab="booked-tables" :to="{name:'booked-tables'}">
              <ion-icon :src="i.beer"></ion-icon>
              <ion-label>Bookings</ion-label>
              <!--<ion-badge>6</ion-badge>-->
            </ion-tab-button>

            <ion-tab-button v-if="auth" tab="profile" :to="{name:'profile'}">
              <ion-icon :src="i.person"></ion-icon>
              <ion-label>Profile</ion-label>
            </ion-tab-button>

          </ion-tab-bar>
        </template>
      </ion-tabs>
    </div>
</template>

<script>
import * as allIcons from 'ionicons/icons'
import { mapGetters } from 'vuex'

export default {
  name: 'tab-root',
  data () {
    return {
      i: allIcons
    }
  },
  computed: {
    ...mapGetters('userModule', {
      auth: 'isAuthenticated'
    })
  }
}
</script>
