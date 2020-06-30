<template>
  <table-card-base :i="i" :pubTable="pubTable" :pubFloors="pubFloors">
      <template slot="table-card-action-button">
        <ion-button size="default" fill="outline" slot="end" @click.prevent="editTableDetails">Reserve</ion-button>
      </template>
      <template slot="table-card-other-details">
        <ion-item>
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label>Mary Smith</ion-label>
          <ion-note slot="end">Reserved By</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.alarm" slot="start"></ion-icon>
          <ion-label>18:35</ion-label>
          <ion-note slot="end">Reserved Until</ion-note>
        </ion-item>
        <ion-card-content>
          Clicking 'Reserve' will cancel the other reservation on table #2
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
  }
}
</script>
