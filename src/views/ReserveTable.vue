<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Reserve Table</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="backToPubDetails">
            <ion-icon :src="i.arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="reserve">
        <ion-item>
            <ion-label position="stacked">Table # To Reserve:</ion-label>
            <ion-input-vue disabled>{{ pubTable.tableNum }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Name on Reservation: <ion-text v-if="pub.ownerId === userId" color="danger">*</ion-text></ion-label>
            <ion-input-vue v-if="pub.ownerId !== userId" type="text"  disabled>{{user.firstName}} {{user.surname}}</ion-input-vue>
            <ion-input-vue v-else autofocus="true" v-model="ownerReservedOnBehalfOf" placeholder="Please add name of person here"></ion-input-vue>
        </ion-item>
        <ion-item v-if="pub.ownerId === userId">
            <ion-label position="stacked">Their Phone Number: <ion-text color="danger">*</ion-text></ion-label>
            <ion-input-vue type="number" v-model="ownerReservedOnBehalfOfPhone" placeholder="Please add number of person here"></ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">In Pub:</ion-label>
            <ion-input-vue disabled>{{ pub.pubName }}</ion-input-vue>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">On date:</ion-label>
            <ion-input-vue disabled>Today</ion-input-vue>
        </ion-item>

        <ion-text color="secondary">
            <p>There is NO time limit on this reservation. Once Reserved it will stay reserved unless freed by punter or publican. You can stay at table as long as you want.</p>
        </ion-text>

        <div class="ion-padding">
            <ion-button expand="block" class="ion-no-margin" :disabled="$v.$invalid && pub.ownerId === userId" type="submit">Confirm Reservation</ion-button>
        </div>
        <div class="ion-padding">
            <ion-button expand="block" class="ion-no-margin" @click.prevent="cancel">Cancel</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import * as allIcons from 'ionicons/icons'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'reserve-table',
  data () {
    return {
      ownerReservedOnBehalfOf: null,
      ownerReservedOnBehalfOfPhone: null,
      i: allIcons
    }
  },
  validations: {
    ownerReservedOnBehalfOf: {
      required
    },
    ownerReservedOnBehalfOfPhone: {
      required
    }
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
    },
    userId () {
      return this.$store.getters.userId
    }
  },
  methods: {
    backToPubDetails () {
      this.$router.replace({ name: 'pub-details', params: { id: this.pub.key } })
    },
    cancel () {
      console.log('reserveTable.vue: cancel button clicked')
      this.$router.replace({ name: 'pub-details', params: { id: this.pub.key } })
    },
    reserve () {
      console.log('reserveTable.vue: confirm reservation button clicked. submitting a new reservation')
      if (this.pub.ownerId !== this.userId) { // owner allowed make as many reservation as they wish in their own pub
        console.log('cancelling all existing reservations for punter')
        this.$store.dispatch('cancelOtherReservationForPunter', { userId: this.userId, tableToIgnoreId: this.pubTable.key })
      }
      console.log('reserveTable.vue: creating reservation')
      this.$store.dispatch('createReservation', { ownerReservedOnBehalfOf: this.ownerReservedOnBehalfOf, ownerReservedOnBehalfOfPhone: this.ownerReservedOnBehalfOfPhone })
      this.$router.replace({ name: 'pub-details', params: { id: this.pub.key } })
    }
  },
  created () {
    if (!this.user || this.user.email === '') {
      this.$store.dispatch('fetchUserDetails')
    }
    if (!this.pub.key || this.pub.key !== this.$route.query.pubId) {
      console.log('this.$route.query:', this.$route.query)
      console.log('no pub state - fetching from DB')
      this.$store.dispatch('fetchPubByPubId', this.$route.query.pubId)
    }
    if (!this.pubTable || this.pubTable.key !== this.$route.params.id) {
      console.log('this.$route.params:', this.$route.params)
      console.log('no pubTable state - fetching from DB')
      this.$store.dispatch('fetchPubTable', this.$route.params.id)
    }
  }

}
</script>
