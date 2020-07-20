<template>
  <div class="ion-page">
    <ion-header>
          <ion-toolbar>
              <ion-title>Your Profile</ion-title>
          </ion-toolbar>
      </ion-header>
    <ion-content class="ion-padding">
      <ion-text><h2>{{ user.email }}</h2></ion-text>
      <ion-item-group>
      <ion-item>
        <ion-label>Time to Arrival Limit</ion-label>
        <ion-toggle
          @ionChange="changeTimeArrivalLimitOn"
          value="timeArrivalLimitOn"
          :checked="timeArrivalLimitOn">
        </ion-toggle>
      </ion-item>
      <ion-item lines="none">
        <ion-note>Allow Publican to cancel reservation if punter does not arrive within time limit</ion-note>
      </ion-item>
      <ion-item :disabled="!timeArrivalLimitOn">
          <ion-label position="stacked">Set Time to Arrival Limit: {{ limitToArrival }} minutes</ion-label>
          <ion-range name="limitToArrival" ref="limitToArrival" pin snaps debounce="700"
            min="15" max="120" step="15" :value="limitToArrival" :v-model="limitToArrival" @ionChange="limitToArrival = $event.target.value">
            <ion-icon slot="start" :src="i.alarm"></ion-icon>
            <ion-icon slot="end" :src="i.alarm"></ion-icon>
          </ion-range>
        </ion-item>
      </ion-item-group>
    </ion-content>
  </div>
</template>

<script>

export default {
  name: 'about',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
