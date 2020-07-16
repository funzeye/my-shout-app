<template>
    <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Create New Pub</h1>

      <form @submit.prevent="submitted">
      <ion-item>
        <ion-label position="stacked">Pub Name <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue @ionBlur="$v.pub.pubName.$touch(true)" type="text" placeholder="e.g. Walsh's Public House" clear-input name="pubName" v-model="pub.pubName"></ion-input-vue>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Address <ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue @ionBlur="$v.pub.addressLine1.$touch(true)" placeholder="Address Line 1" v-model="pub.addressLine1"></ion-input-vue>
        <ion-input-vue placeholder="Address Line 2 (Optional)" v-model="pub.addressLine2"></ion-input-vue>
        <ion-input-vue @ionBlur="$v.pub.townCity.$touch(true)" placeholder="Town/City" v-model="pub.townCity"></ion-input-vue>
        <ion-select-vue @ionBlur="$v.pub.county.$touch(true)" value="" interface="action-sheet" placeholder="County" name="county" v-model="pub.county">
            <ion-select-option value="mayo">Mayo</ion-select-option>
            <ion-select-option value="sligo">Sligo</ion-select-option>
            <ion-select-option value="galway">Galway</ion-select-option>
            <ion-select-option value="roscommon">Roscommon</ion-select-option>
            <ion-select-option value="leitrim">Leitrim</ion-select-option>
            <ion-select-option value="donegal">Donegal</ion-select-option>
            <ion-select-option value="cavan">Cavan</ion-select-option>
            <ion-select-option value="monaghan">Monaghan</ion-select-option>
            <ion-select-option value="cork">Cork</ion-select-option>
            <ion-select-option value="kerry">Kerry</ion-select-option>
            <ion-select-option value="limerick">Limerick</ion-select-option>
            <ion-select-option value="clare">Clare</ion-select-option>
            <ion-select-option value="tipperary">Tipperary</ion-select-option>
            <ion-select-option value="waterford">Waterford</ion-select-option>
            <ion-select-option value="dublin">Dublin</ion-select-option>
            <ion-select-option value="louth">Louth</ion-select-option>
            <ion-select-option value="kilkenny">Kilkenny</ion-select-option>
            <ion-select-option value="carlow">Carlow</ion-select-option>
            <ion-select-option value="wexford">Wexford</ion-select-option>
            <ion-select-option value="wicklow">Wicklow</ion-select-option>
            <ion-select-option value="laois">Laois</ion-select-option>
            <ion-select-option value="longford">Longford</ion-select-option>
            <ion-select-option value="westmeath">Westmeath</ion-select-option>
            <ion-select-option value="meath">Meath</ion-select-option>
            <ion-select-option value="offaly">Offaly</ion-select-option>
            <ion-select-option value="kildare">Kildare</ion-select-option>
        </ion-select-vue>
        <ion-input-vue placeholder="Eircode (Optional)" v-model="pub.eircode"></ion-input-vue>
      </ion-item>
      <ion-note v-if="$v.pub.county.$invalid && $v.pub.county.$dirty" class="error ion-padding" color="danger">county is required</ion-note>

      <ion-item>
        <ion-label position="stacked">Tables Reservable (Total Number)<ion-text color="danger">*</ion-text></ion-label>
        <ion-input-vue
          @ionBlur="$v.pub.numOfTables.$touch(true)"
          type="number"
          clear-input
          placeholder="e.g. 12" v-model.number="pub.numOfTables">
        </ion-input-vue>
        <ion-note v-if="!$v.pub.numOfTables.minVal" class="error ion-padding" color="danger">Must add at least 1 table</ion-note>
      </ion-item>
      <ion-item>
          <ion-label position="stacked">Floors</ion-label>
          <ion-range ref="floors" id="dual-range"
            dual-knobs pin snaps debounce="200" min="-5" max="10" v-model="pub.floors"
            @ionChange="pub.floors = $event.target.value">
            <ion-icon slot="start" :src="i.layers"></ion-icon>
            <ion-icon slot="end" :src="i.layers"></ion-icon>
          </ion-range>
          <ion-note v-if="pub.floors.lower === pub.floors.upper" class="floor-details ion-padding" color="secondary">1 Floor Selected</ion-note>
          <ion-note v-if="pub.floors.lower === pub.floors.upper && pub.floors.upper !== 0" class="floor-details ion-padding" color="secondary">Floor #: {{ pub.floors.lower }}</ion-note>
          <ion-note v-if="pub.floors.lower === pub.floors.upper && pub.floors.upper === 0" class="floor-details ion-padding" color="secondary">Ground Floor Only</ion-note>

          <ion-note v-if="pub.floors.lower !== pub.floors.upper" class="floor-details ion-padding" color="secondary">{{ pub.floors.upper - pub.floors.lower + 1 }} Floors Selected</ion-note>
          <ion-note v-if="pub.floors.lower !== pub.floors.upper" class="floor-details ion-padding" color="secondary">Lowest floor #: {{ pub.floors.lower }}</ion-note>
          <ion-note v-if="pub.floors.lower !== pub.floors.upper" class="floor-details ion-padding" color="secondary">Highest floor #: {{ pub.floors.upper }}</ion-note>
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
      townCity: { required },
      county: { required }
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
      this.$router.replace({ name: 'edit-pub-tables', params: { id: this.pub.key } })
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

<style lang="css" scoped>
 .floor-details {
   padding-top: 0;
 }
</style>
