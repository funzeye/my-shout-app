<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <ion-list>
        <div v-for="pt in pubTables" :key="pt['.key']">
          {{ pt }}
          <table-card :i="i" :pubTable="pt" :floors="pub.floors" />
        </div>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
import TableCard from '../components/TableCard.vue'
import TheHeader from '../components/TheHeader.vue'

export default {

  name: 'home',
  components: {
    TheHeader,
    TableCard
  },
  props: ['i'],
  computed: {
    pubTables () {
      return this.$store.getters.pubTables
    },
    pub () {
      return this.$store.getters.pub
    },
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    if (!this.pub) {
      console.log('fecthing pub linked to user id of: ', this.user.userId)
      this.$store.dispatch('fetchPub', this.user.userId)
    }
    if (!this.pubTables) {
      console.log('fecthing pub tables for pub with key of: ', this.pub.key)
      this.$store.dispatch('fetchPubTables', this.pub.key)
    }
  }
}

</script>
