<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Edit Table Details</h1>
      <h2>Table #{{ $route.params.id }}</h2>
      <h3> {{pubTable}} </h3>

      <form @submit.prevent="submitted">
        <ion-item>
            <ion-label position="stacked">Pub Floor Area Name <ion-text color="danger">*</ion-text></ion-label>
            <!--<ion-select value="" interface="alert" placeholder="e.g. Lounge" name="pubFloorArea" v-model="pubTable.area">-->
            <ion-select-vue value="" interface="alert" placeholder="e.g. Lounge" name="pubFloorArea" v-model="pubTable.pubFloorArea">
                <ion-select-option v-for="pfa in pubFloorAreas" :key="pfa['.key']" :value="pfa.name">{{ pfa.name }}</ion-select-option>
            </ion-select-vue>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Seats</ion-label>
          <ion-range ref="seats" pin snaps debounce="200" min="1" max="12" v-model="pubTable.seats"
            @ionChange="pubTable.seats = $event.target.value">
            <ion-icon slot="start" :src="i.layers"></ion-icon>
            <ion-icon slot="end" :src="i.layers"></ion-icon>
          </ion-range>
        </ion-item>

        <div class="ion-padding">
            <ion-button expand="block" class="ion-no-margin" type="submit">Save Table Details</ion-button>
        </div>
      </form>

    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import * as allIcons from 'ionicons/icons'

export default {
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    TheHeader
  },
  methods: {
    submitted () {
      this.$store.dispatch('updatePubTable', this.pubTable)
      this.$router.replace('create-new-pub-tables')
    }
  },
  computed: {
    pubFloorAreas () {
      return this.$store.getters.pubFloorAreas
    },
    pubTable: {
      get () {
        return this.$store.getters.pubTable
      },
      set (pubTable) {
        this.$store.dispatch('setSelectedPubTable', pubTable)
      }
    }
  },
  created () {
    this.$store.dispatch('fetchPubFloorAreas')
    console.log('pubTable key:', this.pubTable.key)
    this.$store.dispatch('fetchPubTable', this.pubTable.key)
  },
  mounted () {
    this.$refs.seats.value = this.pubTable.seats
  }
}
</script>
