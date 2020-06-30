<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <!--<h2>user id: {{ userId }}</h2>
      <h2>pub.floors: {{ pub.floors }}</h2>
      <h2>pubTables: {{ pubTables }}</h2>-->
      <ion-list>
        <div v-for="pt in pubTables" :key="pt['.key']">
          <!--{{ pt }}-->
          <table-card :i="i" :pubTable="pt" :pubFloors="pub.floors" />
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
    userId () {
      return this.$store.getters.userId
    }
  },
  created () {
    if (!this.pub || this.pub.pubName === '') {
      console.log('fecthing pub linked to user id of: ', this.userId)
      this.$store.dispatch('fetchPub', this.userId)
    }
  }
}

</script>
