<template>
  <div>
      <ion-card button="true" @click.prevent="viewPub">
        <ion-card-header>
          <ion-card-subtitle>Pub</ion-card-subtitle>
          <ion-card-title>{{ pub.pubName }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-text-capitalize">
          <div>
          {{pub.addressLine1 }}, {{ pub.townCity }}, {{ pub.county }}
          </div>
        </ion-card-content>
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
