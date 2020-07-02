<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Reserve Table</h1>
      <form @submit.prevent="reserve">

        <ion-item>
            <ion-label position="stacked">Table Reserved</ion-label>
            <ion-input-vue readonly>{{ pubTable.tableNum }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Name on Reservation</ion-label>
            <ion-input-vue readonly>{{ userId }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">In Pub:</ion-label>
            <ion-input-vue readonly>{{ pub.pubName }}</ion-input-vue>
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
    userId () {
      return this.$store.getters.userId
    },
    reservation () {
      return this.$store.getters.reservation
    }
  },
  methods: {
    cancel () {
      console.log('reservetable.vue: cancel button clicked')
      this.$router.push({ name: 'home' })
    },
    reserve () {
      console.log('reservetable.vue: confirm reservation button clicked. submitting a new reservation')
      this.$store.dispatch('createReservation')
      this.$router.replace('home')
    }
  }

}
</script>
