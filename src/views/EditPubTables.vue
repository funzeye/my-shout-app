<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Tables</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="backToPubDetails">
            <ion-icon :src="i.arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <div v-for="pt in pubTables" :key="pt['.key']">
          <table-card :i="i" :pubTable="pt" :pubFloors="pub.floors" />
        </div>
      </ion-list>
      <form @submit.prevent="submitted">
        <div class="ion-padding">
          <ion-button expand="block" class="ion-no-margin" type="submit">Complete</ion-button>
        </div>
      </form>
    </ion-content>
    <router-view></router-view>
  </div>
</template>

<script>
import TableCard from '../components/TableCardEdit.vue'
import * as allIcons from 'ionicons/icons'

export default {
  name: 'edit-pub-tables',
  components: {
    TableCard
  },
  data () {
    return {
      i: allIcons
    }
  },
  methods: {
    submitted () {
      this.$router.replace({ name: 'pub-details', params: { id: this.pub.key } })
    },
    backToPubDetails () {
      this.$router.replace({ name: 'pub-details', params: { id: this.pub.key } })
    }
  },
  computed: {
    pubTables () {
      return this.$store.getters.pubTables
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
  watch: {
    pubTables (newPubTables, oldPubTables) {
      console.log('pubTables is updated')
    }
  },
  created () {
    if (!this.pubTables.length === 0) {
      console.log('fecthing pub tables for pub with key of: ', this.pub.key)
      this.$store.dispatch('fetchPubTables', this.pub.key)
    }
  }
}
</script>
