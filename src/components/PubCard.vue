<template>
  <div>
      <ion-card>
        <ion-item>
          <ion-icon :src="i.home" slot="start"></ion-icon>
          <ion-label>{{ pub.pubName }}</ion-label>
          <ion-button size="default" fill="outline" slot="end" @click.prevent="viewPub">{{ actionName }}</ion-button>
        </ion-item>
        <ion-item>
          <ion-label>Street: {{ pub.addressLine1 }} </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Town/City: {{ pub.townCity }} </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>County: {{ pub.county }} </ion-label>
        </ion-item>
      </ion-card>
  </div>
</template>

<script>
import * as allIcons from 'ionicons/icons'

export default {
  props: ['pub', 'actionName'],
  data () {
    return {
      i: allIcons
    }
  },
  methods: {
    viewPub () {
      this.$router.push({ name: 'pub-details', params: { id: this.pub.key } })
    }
  }
}
</script>
