<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Edit User Details</ion-title>
                <ion-buttons slot="start">
                <ion-button @click="backToProfile">
                    <ion-icon :src="i.arrowBack"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
        <ion-grid>
            <ion-row>
            <ion-col size="12" offset-md="3" size-md="6" offset-xl="4" size-xl="4">
                <h1 class="ion-padding-start">Edit User Details</h1>
            </ion-col>
            </ion-row>
        </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import * as allIcons from 'ionicons/icons'

export default {
  name: 'edit-user-details',
  data () {
    return {
      i: allIcons
    }
  },
  methods: {
    backToProfile () {
      this.$router.replace({ name: 'profile' })
    }
  }
}
</script>

<style scoped>

</style>
