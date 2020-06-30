<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Edit Table Details for {{ pub.pubName }}</h1>
      <!-- <h2>{{ pub }} </h2> -->
      <ion-list>
        <div v-for="pt in pubTables" :key="pt['.key']">
          <!-- {{ pt }} -->
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
import TheHeader from '../components/TheHeader.vue'
import TableCard from '../components/TableCard.vue'
import * as allIcons from 'ionicons/icons'

export default {
  name: 'create-new-pub-tables',
  components: {
    TheHeader,
    TableCard
  },
  data () {
    return {
      i: allIcons
    }
  },
  methods: {
    submitted () {
      this.$router.replace({ name: 'home' })
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
