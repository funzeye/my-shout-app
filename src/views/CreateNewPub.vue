<template>
    <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Create New Pub</h1>

      <form @submit.prevent="submitted">
      <ion-item>
        <ion-label position="stacked">Pub Name <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue @blur="$v.pub.pubName.touch()" type="text" placeholder="e.g. Walsh's Public House" clear-input name="pubName" v-model="pub.pubName"></ion-input-vue>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Address <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue @blur="$v.pub.addressLine1.touch()" placeholder="Address Line 1" v-model="pub.addressLine1"></ion-input-vue>
        <ion-input-vue placeholder="Address Line 2 (Optional)" v-model="pub.addressLine2"></ion-input-vue>
        <ion-input-vue @blur="$v.pub.townCity.touch()" placeholder="Town/City" v-model="pub.townCity"></ion-input-vue>
        <ion-select-vue value="" interface="alert" placeholder="County" name="county" v-model="pub.county">
            <ion-select-option value="mayo">Mayo</ion-select-option>
            <ion-select-option value="sligo">Sligo</ion-select-option>
            <ion-select-option value="galway">Galway</ion-select-option>
            <ion-select-option value="roscommon">Roscommon</ion-select-option>
            <ion-select-option value="leitrim">Leitrim</ion-select-option>
        </ion-select-vue>
        <ion-input-vue placeholder="Eircode (Optional)" v-model="pub.eircode"></ion-input-vue>
      </ion-item>

      <ion-item>
          <ion-label position="stacked">Floors</ion-label>
          <ion-range ref="floors" id="dual-range"
            dual-knobs pin snaps debounce="200" min="-5" max="10" v-model="pub.floors"
            @ionChange="pub.floors = $event.target.value">
            <ion-icon slot="start" :src="i.layers"></ion-icon>
            <ion-icon slot="end" :src="i.layers"></ion-icon>
          </ion-range>
          <ion-note v-if="pub.floors.lower === pub.floors.upper" class="error ion-padding" color="secondary">1 Floor Selected</ion-note>
          <ion-note v-if="pub.floors.lower === pub.floors.upper && pub.floors.upper !== 0" class="error ion-padding" color="secondary">Floor #: {{ pub.floors.lower }}</ion-note>
          <ion-note v-if="pub.floors.lower === pub.floors.upper && pub.floors.upper === 0" class="error ion-padding" color="secondary">Ground Floor Only</ion-note>

          <ion-note v-if="pub.floors.lower !== pub.floors.upper" class="error ion-padding" color="secondary">{{ pub.floors.upper - pub.floors.lower + 1 }} Floors Selected</ion-note>
          <ion-note v-if="pub.floors.lower !== pub.floors.upper" class="error ion-padding" color="secondary">Lowest floor #: {{ pub.floors.lower }}</ion-note>
          <ion-note v-if="pub.floors.lower !== pub.floors.upper" class="error ion-padding" color="secondary">Highest floor #: {{ pub.floors.upper }}</ion-note>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Tables Reservable (Total Number)<ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue
          @blur="$v.pub.numOfTables.touch()"
          type="number"
          clear-input
          placeholder="e.g. 12" v-model.number="pub.numOfTables">
        </ion-input-vue>
        <ion-note v-if="!$v.pub.numOfTables.minVal" class="error ion-padding" color="danger">Must add at least 1 table</ion-note>
      </ion-item>

      <div class="ion-padding">
        <ion-button expand="block" class="ion-no-margin" :disabled="$v.$invalid" type="submit">Create Pub</ion-button>
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
import { required, numeric, minValue } from 'vuelidate/lib/validators'
import * as allIcons from 'ionicons/icons'

export default {
  data () {
    return {
      i: allIcons
    }
  },
  validations: {
    pub: {
      numOfTables: {
        required,
        numeric,
        minVal: minValue(1)
      },
      pubName: { required },
      addressLine1: { required },
      townCity: { required }
      // county: { required }
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
      this.$router.replace('create-new-pub-tables')
    }
  },
  created () {
    // this.$store.dispatch('fetchUser')
    this.$store.dispatch('fetchPubs')
  },
  mounted () {
    this.$refs.floors.value = this.pub.floors
  }
}
</script>
