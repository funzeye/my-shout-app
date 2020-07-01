<template>
  <table-card-base :i="i" :pubTable="pubTable" :pubFloors="pubFloors">
      <template v-if="isReserved" slot="table-card-action-button">
        <ion-button color="danger" size="default" fill="outline" slot="end" @click.prevent="cancelTableReservation">Cancel</ion-button>
      </template>
      <template v-else slot="table-card-action-button">
        <ion-button size="default" fill="outline" slot="end" @click.prevent="reserveTable">Reserve</ion-button>
      </template>
      <template slot="table-card-other-details">
        <ion-item>
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved By</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.alarm" slot="start"></ion-icon>
          <ion-label>No Limit</ion-label>
          <ion-note slot="end">Reserved Until</ion-note>
        </ion-item>
        <ion-card-content>
          Making a 'Reservation' will cancel the any other active reservations you currently have
        </ion-card-content>
      </template>
  </table-card-base>
</template>

<script>
import TableCardBase from '../components/TableCardBase.vue'

export default {
  props: ['i', 'pubTable', 'pubFloors'],
  components: {
    TableCardBase
  },
  computed: {
    isReserved () {
      const reservations = this.$store.getters.reservations
      return reservations.some(item => item.tableId === this.pubTable.key)
    }
  },
  methods: {
    reserveTable () {
      this.$store.dispatch('setSelectedPubTable', this.pubTable)
      this.$router.push({ name: 'reserve-table' })
    },
    cancelTableReservation () {
      this.$store.dispatch('cancelReservation', this.pubTable.key)
    }
  }
}
</script>
