<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Reserve Table</h1>
      <form @submit.prevent="reserve">
        <ion-item>
            <ion-label position="stacked">Table # To Reserve:</ion-label>
            <ion-input-vue readonly>{{ pubTable.tableNum }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Name on Reservation:</ion-label>
            <ion-input-vue readonly>{{ user.firstName + ' ' + user.surname  }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">In Pub:</ion-label>
            <ion-input-vue readonly>{{ pub.pubName }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">On date:</ion-label>
            <ion-input-vue readonly>Today</ion-input-vue>
        </ion-item>

        <ion-text color="secondary">
            <p>There is NO time limit on this reservation. Once Reserved it will stay reserved unless you cancel or leave. You can stay at table as long as you want.</p>
        </ion-text>

        <div class="ion-padding">
            <ion-button expand="block" class="ion-no-margin" type="submit">Confirm Reservation</ion-button>
        </div>
        <div class="ion-padding">
            <ion-button expand="block" class="ion-no-margin" @click.prevent="cancel">Cancel</ion-button>
        </div>
      </form>
    </ion-content>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'

export default {
  name: 'reserve-table',
  components: {
    TheHeader
  },
  computed: {
    pubTable () {
      return this.$store.getters.pubTable
    },
    pub () {
      return this.$store.getters.pub
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    cancel () {
      console.log('reserveTable.vue: cancel button clicked')
      this.$router.push({ name: 'home' })
    },
    reserve () {
      console.log('reserveTable.vue: confirm reservation button clicked. submitting a new reservation')
      console.log('cancelling all existing reservations for punter')
      this.$store.dispatch('cancelAllReservationsForPunter', this.user.userId)
      console.log('reserveTable.vue: creating reservation')
      this.$store.dispatch('createReservation')
      this.$router.replace('home')
    }
  },
  created () {
    if (!this.user) {
      this.$store.dispatch('fetchUserDetails')
    }
  }

}
</script>
