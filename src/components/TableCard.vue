<template>
  <div>
      <ion-card>
        <ion-item>
          <ion-icon :src="i.beer" slot="start"></ion-icon>
          <ion-label>Table #1</ion-label>
          <ion-button size="default" fill="outline" slot="end">Reserve</ion-button>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.location" slot="start"></ion-icon>
          <ion-label>Lounge</ion-label>
          <ion-icon :src="i.people" slot="end"></ion-icon>
          <ion-label slot="end">4</ion-label>
          <ion-note slot="end">Location &amp; Seats</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved By</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.alarm" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved Until</ion-note>
        </ion-item>
        <ion-card-content>
          Clicking 'Reserve' will cancel the other reservation on table #2
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-item>
          <ion-icon :src="i.beer" slot="start"></ion-icon>
          <ion-label>Table #2</ion-label>
          <ion-button size="default" color="warning" fill="outline" slot="end">Cancel</ion-button>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.location" slot="start"></ion-icon>
          <ion-label>Lounge</ion-label>
          <ion-icon :src="i.people" slot="end"></ion-icon>
          <ion-label slot="end">5</ion-label>
          <ion-note slot="end">Location &amp; Seats</ion-note>
        </ion-item>
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
          Click on 'Cancel' button to cancel the reservation
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-item>
          <ion-icon :src="i.beer" slot="start"></ion-icon>
          <ion-label>Table #32</ion-label>
          <ion-button size="default" fill="outline" slot="end">Reserve</ion-button>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.location" slot="start"></ion-icon>
          <ion-label>Bar</ion-label>
          <ion-icon :src="i.people" slot="end"></ion-icon>
          <ion-label slot="end">2</ion-label>
          <ion-note slot="end">Location &amp; Seats</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved By</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.alarm" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved Until</ion-note>
        </ion-item>
        <ion-card-content>
          Clicking 'Reserve' will cancel the other reservation on table #2
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-item>
          <ion-icon :src="i.beer" slot="start"></ion-icon>
          <ion-label>Table #21</ion-label>
          <ion-button size="default" fill="outline" slot="end">Reserve</ion-button>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.location" slot="start"></ion-icon>
          <ion-label>Beer Garden (2nd Floor)</ion-label>
          <ion-icon :src="i.people" slot="end"></ion-icon>
          <ion-label slot="end">6</ion-label>
          <ion-note slot="end">Location &amp; Seats</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.person" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved By</ion-note>
        </ion-item>
        <ion-item>
          <ion-icon :src="i.alarm" slot="start"></ion-icon>
          <ion-label></ion-label>
          <ion-note slot="end">Reserved Until</ion-note>
        </ion-item>
        <ion-card-content>
          Clicking 'Reserve' will cancel the other reservation on table #2
        </ion-card-content>
      </ion-card>
  </div>
</template>

<script>
export default {
  props: ['i']
}
</script>
