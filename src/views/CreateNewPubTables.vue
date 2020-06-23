<template>
    <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>Edit Table Details for {{ pub.pubName }}</h1>

      <ion-list>
        <div v-for="pt in pubTables" :key="pt['.key']">
          <table-card :i="i" :table="pt" :floors="pub.floors" />
        </div>
      </ion-list>

      <form @submit.prevent="submitted">
        <div class="ion-padding">
          <ion-button expand="block" class="ion-no-margin" type="submit">Continue</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TableCard from '../components/TableCard.vue'
import * as allIcons from 'ionicons/icons'

export default {
  components: {
    TheHeader,
    TableCard
  },
  data () {
    return {
      i: allIcons
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
  }
}
</script>
