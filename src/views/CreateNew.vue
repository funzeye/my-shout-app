<template>
    <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Create New Pub</h1>

      <form>
      <ion-item>
        <ion-label position="stacked">Pub Name <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue required type="text" placeholder="e.g. Walsh's Public House" clear-input name="pubName" v-model="pub.pubName"></ion-input-vue>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Address <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue required placeholder="Address Line 1" v-model="pub.addressLine1"></ion-input-vue>
        <ion-input-vue placeholder="Address Line 2 (Optional)" v-model="pub.addressLine2"></ion-input-vue>
        <ion-input-vue required placeholder="Town/City" v-model="pub.townCity"></ion-input-vue>
        <ion-select-vue required placeholder="County" name="county" v-model="pub.county">
            <ion-select-option value="mayo">Mayo</ion-select-option>
            <ion-select-option value="sligo">Sligo</ion-select-option>
            <ion-select-option value="galway">Galway</ion-select-option>
            <ion-select-option value="roscommon">Roscommon</ion-select-option>
            <ion-select-option value="leitrim">Leitrim</ion-select-option>
          </ion-select-vue>
        <ion-input-vue placeholder="Eircode (Optional)" v-model="pub.eircode"></ion-input-vue>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">No. of Tables <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue required type="number" placeholder="e.g. 12" clear-input v-model="pub.numOfTables"></ion-input-vue>
      </ion-item>

      <div class="ion-padding">
        <ion-button expand="block" class="ion-no-margin" @click.prevent="submitted">Create Pub</ion-button>
      </div>
      </form>

      <ion-list>
        <ion-item v-for="p in pubs" :key="p['.key']">
          <ion-label>Pub Name: {{ p.pubName }}</ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    TheHeader
  },
  computed: {
    pubs () {
      return this.$store.getters.pubs
    },
    pub: {
      get () {
        return this.$store.getters.pub
      },
      set (pub) {
        this.$store.dispatch('updatePub', pub)
      }
    }
  },
  methods: {
    submitted () {
      var newPub = this.pub
      console.log('submitted new pub details:')
      console.log(newPub)

      this.$store.dispatch('storePub', newPub)
    },
    resetForm () {
      this.pub.pubName = ''
      this.pub.addressLine1 = ''
      this.pub.addressLine2 = ''
      this.pub.townCity = ''
      this.pub.county = ''
      this.pub.eircode = ''
      this.pub.numOfTables = ''
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
    this.$store.dispatch('fetchPubs')
  }
}
</script>
