<template>
  <div>
      <ion-card>
        <ion-item>
          <ion-icon :src="i.beer" slot="start"></ion-icon>
          <ion-label>Table #: {{ pubTable.tableNum }}</ion-label>
          <slot name="table-card-action-button"></slot>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.layers" slot="start"></ion-icon>
          <ion-label v-if="pubTable.floor === 0">Ground Floor</ion-label>
          <ion-label v-else>Floor #: {{ pubFloors.lower }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.location" slot="start"></ion-icon>
          <ion-label>Area: {{ pubTable.pubFloorArea }} </ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.people" slot="start"></ion-icon>
          <ion-label>No. of Seats: {{ pubTable.seats }}</ion-label>
        </ion-item>
        <slot name="table-card-other-details"></slot>
      </ion-card>
  </div>
</template>

<script>
export default {
  props: ['i', 'pubTable', 'pubFloors']
}
</script>
