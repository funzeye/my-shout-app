<template>
  <table-card-base :i="i" :pubTable="pubTable" :pubFloors="pubFloors">
      <template v-if="(!reservation.isCancelled && reservation.reservedBy === loggedInUserId) ||
        (!reservation.isCancelled && userIsOwner && reservation.reservedBy && reservation.timeToArrivalLimit && new Date(reservation.timeToArrivalLimit).getTime() < new Date().getTime()) ||
        (!reservation.isCancelled && userIsOwner && reservation.reservedBy && !reservation.timeToArrivalLimit)"
        slot="table-card-action-button">
        <ion-button color="danger" size="default" fill="outline" slot="end" @click.prevent="cancelTableReservation">Cancel</ion-button>
      </template>
      <template v-else-if="!reservation.isCancelled && reservation.reservedBy && reservation.reservedBy !== loggedInUserId" slot="table-card-action-button">
        <ion-button size="default" fill="outline" slot="end" color="success" disabled>Reserved</ion-button>
      </template>
      <template v-else slot="table-card-action-button">
        <ion-button size="default" fill="outline" slot="end" @click.prevent="reserveTable">Reserve</ion-button>
      </template>
      <template slot="table-card-other-details">
        <ion-item v-if="!reservation.isCancelled && reservation.reservedBy && !reservation.reservedByOwner && ((reservation.reservedBy === loggedInUserId) || userIsOwner)">
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label>{{ reservation.userDetails.firstName + ' ' + reservation.userDetails.surname }}</ion-label>
          <ion-note slot="end">Reserved By Punter</ion-note>
        </ion-item>
        <ion-item v-if="!reservation.isCancelled && reservation.reservedBy && !reservation.reservedByOwner && ((reservation.reservedBy === loggedInUserId) || userIsOwner)">
          <ion-icon :src="i.call" slot="start"></ion-icon>
          <ion-label>{{ reservation.userDetails.phone }}</ion-label>
        </ion-item>
        <ion-item v-else-if="!reservation.isCancelled && reservation.reservedBy && reservation.reservedByOwner && userIsOwner">
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label>{{ reservation.ownerReservedOnBehalfOf }}</ion-label>
          <ion-note slot="end">Reserved By Publican</ion-note>
        </ion-item>
        <ion-item v-if="!reservation.isCancelled && reservation.reservedBy ">
          <ion-icon :src="i.alarm" slot="start"></ion-icon>
          <ion-label>No Limit</ion-label>
          <ion-note slot="end">Reserved Until</ion-note>
        </ion-item>
        <ion-card-content v-if="!reservation.isCancelled && !reservation.reservedBy">
          Clicking 'Reserve' will reserve this table and cancel any other active reservations you currently have
        </ion-card-content>
        <ion-card-content v-if="!reservation.isCancelled && reservation.reservedBy === loggedInUserId">
          Clicking 'Cancel' will cancel this reservation and allow it to the reserved by others
        </ion-card-content>
        <ion-card-content v-if="!reservation.isCancelled && reservation.reservedBy && reservation.reservedBy !== loggedInUserId">
          Table currently unavailable
        </ion-card-content>
      </template>
  </table-card-base>
</template>

<script>
import TableCardBase from '../components/TableCardBase.vue'

export default {
  props: ['i', 'pubTable', 'pubFloors', 'loggedInUserId', 'userIsOwner'],
  data () {
    return {
      reservedButUnlocked () {
        // 1 check that logged in user is onwer of pub
        if (this.userIsOwner) {
          // 2 check that reservation exists for this table
          if (this.reservation.reservedBy !== null && this.reservation.reservedBy !== '') {
            // 3 check arrival limit has passed
            return this.reservation.timeToArrivalLimit > new Date()
          }
        }
        return false
      }
    }
  },
  components: {
    TableCardBase
  },
  computed: {
    // isReserved () {
    //  const reservations = this.$store.getters.reservations
    //  return reservations.some(item => item.tableId === this.pubTable.key)
    // },
    reservation () {
      const reservations = this.$store.getters.allTodaysReservationsForPub
      if (reservations && reservations.length > 0) {
        const reservationsWithThisTableKey = reservations.filter(item => item.table.tableId === this.pubTable.key)
        if (reservationsWithThisTableKey.length === 1) {
          return reservationsWithThisTableKey[0]
        } else if (reservationsWithThisTableKey.length > 1) {
          console.log('Error: 2 active reservations found for same table')
        }
      }
      return {
        reservedBy: '',
        userDetails: {
          firstName: '',
          surname: ''
        }
      }
    }
  },
  methods: {
    reserveTable () {
      this.$store.dispatch('fetchUserDetails')
      this.$store.dispatch('setSelectedPubTable', this.pubTable)
      this.$router.push({ name: 'reserve-table', params: { id: this.pubTable.key }, query: { pubId: this.pubTable.pubId } })
    },
    cancelTableReservation () {
      this.$store.dispatch('cancelReservationForCurrentlySelectedPubWithPubId', this.pubTable.key)
    }
  }
}
</script>
