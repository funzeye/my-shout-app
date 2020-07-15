<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Edit Table Details</h1>
      <h2>Table #{{ $route.params.id }}</h2>
      <form @submit.prevent="submitted">
        <ion-item>
            <ion-label position="stacked">Pub Floor Area Name <ion-text color="danger">*</ion-text></ion-label>
            <ion-select-vue value="" interface="action-sheet" placeholder="e.g. Lounge" name="pubFloorArea" v-model="pubTable.pubFloorArea">
                <ion-select-option v-for="pfa in pubFloorAreas" :key="pfa['.key']" :value="pfa.name">{{ pfa.name }}</ion-select-option>
            </ion-select-vue>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Seats {{ pubTable.seats }}</ion-label>
          <ion-range name="seats" ref="seats" pin snaps debounce="200" min="1" max="12" v-model="pubTable.seats"
            @ionChange="pubTable.seats = $event.target.value">
            <ion-icon slot="start" :src="i.people"></ion-icon>
            <ion-icon slot="end" :src="i.people"></ion-icon>
          </ion-range>
        </ion-item>

        <ion-item v-if="pubFloors.lower !== pubFloors.upper">
          <ion-label position="stacked">Located on Floor # {{ pubTable.floor }}</ion-label>
          <ion-range name="floor" ref="floor" pin snaps debounce="200" :min="pubFloors.lower" :max="pubFloors.upper" v-model="pubTable.floor"
            @ionChange="updateTableFloors">
            <ion-icon slot="start" :src="i.layers"></ion-icon>
            <ion-icon slot="end" :src="i.layers"></ion-icon>
          </ion-range>
        </ion-item>
        <ion-item v-else>
          <ion-label ref="floor" position="stacked">Located on Floor # {{ pubFloors.lower }}</ion-label>
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
      this.$router.replace({ name: 'edit-pub-tables' })
    },
    updateTableFloors (e) {
      console.log('updating table floors:', e)
      this.pubTable.floor = e.target.value
    }
  },
  computed: {
    pubFloors () {
      return this.$store.getters.pub.floors
    },
    pubFloorAreas () {
      return this.$store.getters.pubFloorAreas
    },
    pubTable: {
      get () {
        console.log('getting pubTable from getter')
        return this.$store.getters.pubTable
      },
      set (pubTable) {
        console.log('updating pubTable in setter:', pubTable)
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
    this.$refs.floor.value = this.pubTable.floor
  }
}
</script>
