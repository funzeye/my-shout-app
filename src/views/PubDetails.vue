<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ pub.pubName }}</ion-title>
        <ion-buttons v-if="pub.ownerId === userId" slot="end">
          <ion-button @click="editPub">
            <ion-icon :src="i.settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-grid style="max-width:1200px;">
          <ion-row>
            <ion-col size="12" size-md="6" size-lg="4" v-for="pt in sortedTables" :key="pt['.key']">
                <table-card :i="i" :pubTable="pt" :loggedInUserId="userId" :pubFloors="pub.floors"
                :userIsOwner="pub.ownerId === userId"/>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
import TableCard from '../components/TableCardReservation.vue'
import * as allIcons from 'ionicons/icons'
import { mapGetters } from 'vuex'

export default {

  name: 'pub-details',
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    TableCard
  },
  computed: {
    ...mapGetters('pubModule', [
      'pubTables',
      'pub'
    ]),
    ...mapGetters('userModule', [
      'userId'
    ]),
    sortedTables () {
      var items = this.pubTables
      return items.sort((a, b) => a.tableNum - b.tableNum)
    }
  },
  created () {
    console.log(this.$route)
    console.log('current route param id ', this.$route.params.id)
    if (!this.pub || this.pub.key !== this.$route.params.id) {
      console.log('fecthing pub linked to pub id of: ', this.$route.params.id)
      this.$store.dispatch('pubModule/fetchPubByPubId', this.$route.params.id)
    } else {
      console.log('current pub key: ', this.pub.key)
      console.log('current pub in state matches current pub on screen - not retreiving data from db')
    }
  },
  methods: {
    editPub () {
      this.$router.push({ name: 'edit-pub', params: { id: this.pub.key } })
    }
  }
}

</script>
