<template>
    <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
      </ion-toolbar>
    </ion-header>
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
export default {
  data () {
    return {
      pub: {
        pubName: '',
        addressLine1: '',
        addressLine2: '',
        townCity: '',
        county: '',
        eircode: '',
        numOfTables: ''
      },
      pubs: []
    }
  },
  methods: {
    submitted () {
      console.log('submitted new pub details:')
      console.log(this.pub)
      console.log('http post - response:')
      this.$http.post('', this.pub)
        .then(response => {
          console.log(response)
        }, error => {
          console.log(error)
        })
      this.resetForm() // clear form automatically after successful request
      this.fetchData()
    },
    fetchData () {
      console.log('fecthing data from the DB and updating List')
      this.$http.get('', { params: { pubName: "Walsh's Public House" } })
        .then(response => {
          console.log(response)
          return response.json()
        }, error => {
          console.log(error)
        })
        .then(data => {
          const resultArray = []
          for (const key in data) {
            resultArray.push(data[key])
          }
          this.pubs = resultArray
        })
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
  mounted: function () {
    this.fetchData()
  }
}
</script>
