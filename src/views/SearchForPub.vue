<template>
  <div class="ion-page">
    <the-header />
    <ion-content>
        <ion-searchbar show-cancel-button="focus"
        debounce="300" @ionChange="filterSearchItems($event.target)"></ion-searchbar>
        <ion-list>
            <div animated="true" v-show="!p.hidePub" v-for="p in pubs" :key="p['.key']">
                <pub-card :i="i" :pub="p" />
            </div>
        </ion-list>
    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import * as allIcons from 'ionicons/icons'
import PubCard from '../components/PubCard.vue'

export default {
  name: 'search-for-pub',
  data () {
    return {
      i: allIcons
    }
  },
  components: {
    TheHeader,
    PubCard
  },
  computed: {
    pubs: {
      get () {
        return this.$store.getters.pubs
      }
    }
  },
  created () {
    if (!this.pubs || this.pubs.length === 0) {
      this.$store.dispatch('fetchPubs')
    }
  },
  methods: {
    filterSearchItems (eTarget) {
      console.log('target:', eTarget)
      const valueToFilter = eTarget.value.toLowerCase()
      requestAnimationFrame(() => {
        console.log('this.pubs:', this.pubs)
        this.pubs.forEach((item, index) => {
          console.log('item:', item)
          const shouldShow = item.pubName.toLowerCase().indexOf(valueToFilter) > -1
          console.log('item.pubName.indexOf(valueToFilter):', item.pubName.toLowerCase().indexOf(valueToFilter))
          console.log('shouldShow:', shouldShow)
          console.log('!shouldShow:', !shouldShow)
          console.log('item.hidePub:', item.hidePub)
          item.hidePub = !shouldShow
          this.$set(this.pubs, index, item)
          console.log('item.hidePub:', item.hidePub)
        })
        console.log('pubs:', this.pubs)
      })
    }
  }
}
</script>
