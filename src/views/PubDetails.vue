<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <ion-list>
        <div v-for="pt in pubTables" :key="pt['.key']">
          <table-card :i="i" :pubTable="pt" :pubFloors="pub.floors" />
        </div>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
import TableCard from '../components/TableCardReservation.vue'
import TheHeader from '../components/TheHeader.vue'

export default {

  name: 'pub-details',
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
    console.log(this.$route)
    if (!this.pub || this.pub.pubName === '') {
      console.log('fecthing pub linked to pub id of: ', this.$route.params.id)
      this.$store.dispatch('fetchPubByPubId', this.$route.params.id)
    }
  }
}

</script>
