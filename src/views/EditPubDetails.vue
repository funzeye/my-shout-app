<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-title>Pub Settings</ion-title>
                <ion-buttons slot="start">
                <ion-button @click="backToEditPub">
                    <ion-icon :src="i.arrowBack"></ion-icon>
                </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <PubDetailsForm mode="edit"/>
        </ion-content>
    </div>
</template>

<script>
import * as allIcons from 'ionicons/icons'
import PubDetailsForm from '../components/PubDetailsForm.vue'

export default {
  components: {
    PubDetailsForm
  },
  data () {
    return {
      i: allIcons
    }
  },
  methods: {
    backToEditPub () {
      this.$router.replace({ name: 'edit-pub', params: { id: this.$route.params.id } })
    }
  }
}
</script>
