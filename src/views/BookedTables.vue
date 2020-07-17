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

        <ion-card v-if="isPublican && allReservationsForPub && allReservationsForPub.length > 0">
            <ion-card-header>
                <ion-card-title>Bookings</ion-card-title>
            </ion-card-header>

            <ion-card-content>
            <ion-list v-for="ar in allReservationsForPub" :key="ar['.key']">
                <ion-item>
                    <ion-label>
                        <ion-label>
                        <h2>{{ ar.userDetails.firstName + ' ' + ar.userDetails.surname }}</h2>
                        <h2>{{ ar.userDetails.phone }}</h2>
                        <h3>{{ ar.table.seats }} seats &#64; table &#35; {{ ar.table.tableNum }}</h3>
                        <p>on {{ new Date(ar.reservedAtDate).toDateString() }}</p>
                    </ion-label>
                    </ion-label>
                </ion-item>
            </ion-list>
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
    user () {
      return this.$store.getters.user
    },
    isPublican () {
      return this.$store.getters.isPublican
    },
    isPunter () {
      return this.$store.getters.isPunter
    },
    activeReservation () {
      return this.$store.getters.activeReservationForPunter
    },
    allReservationsForPub () {
      var items = this.$store.getters.allReservationsForPub
      return items.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.reservedAtDate) - new Date(a.reservedAtDate)
      })
    },
    previousReservations () {
      return this.$store.getters.previousReservationsForPunter
    },
    publicansPub () {
      return this.$store.getters.publicansPub
    }
  },
  created () {
    if (this.user.email === '') {
      this.$store.dispatch('fetchUserDetails', this.userId)
    }
    if (!this.publicansPub || this.publicansPub === '') {
      this.$store.dispatch('fetchPubs')
    }
    this.$store.dispatch('fetchReservationsForPunter', this.userId)
    this.$store.dispatch('fetchReservationsForPub', this.publicansPub.key)
  }
}
</script>
