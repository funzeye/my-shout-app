<template>
  <div class="ion-page">
      <ion-header>
          <ion-toolbar>
              <ion-title>Bookings</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content>
          <ion-card v-if="activeReservation && activeReservation.pub">
            <ion-card-header>
                <ion-card-title>Active Booking</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-item lines="none">
                    <ion-label>
                        <h2>{{ activeReservation.pub.pubName }}</h2>
                        <h3>{{ activeReservation.table.seats }} seats &#64; table &#35; {{ activeReservation.table.tableNum }}</h3>
                        <p>on {{ new Date(activeReservation.reservedAtDate).toDateString() }}</p>
                    </ion-label>
                </ion-item>
            </ion-card-content>
        </ion-card>
        <ion-card v-if="previousReservations && previousReservations.length > 0">
            <ion-card-header>
                <ion-card-title>Previous Bookings</ion-card-title>
            </ion-card-header>

            <ion-card-content>
            <ion-list v-for="pr in previousReservations" :key="pr['.key']">
                <ion-item>
                    <ion-label>
                        <ion-label>
                        <h2>{{ pr.pub.pubName }}</h2>
                        <h3>{{ pr.table.seats }} seats &#64; table &#35; {{ pr.table.tableNum }}</h3>
                        <p>on {{ new Date(pr.reservedAtDate).toDateString() }}</p>
                    </ion-label>
                    </ion-label>
                </ion-item>
            </ion-list>
            </ion-card-content>
        </ion-card>
      </ion-content>
  </div>
</template>

<script>
export default {
  name: 'booked-tables',
  computed: {
    userId () {
      return this.$store.getters.userId
    },
    activeReservation () {
      return this.$store.getters.activeReservationForPunter
    },
    allTodaysReservationsForPub () {
      return this.$store.getters.allTodaysReservationsForPub
    },
    previousReservations () {
      return this.$store.getters.previousReservationsForPunter
    }
  },
  created () {
    this.$store.dispatch('fetchReservationsForPunter', this.userId)
  }
}
</script>
