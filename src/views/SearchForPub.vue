<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <template v-if="user.userRoles && user.userRoles.publican === true">
        <ion-text>
          <h1 class="ion-padding">Your Pubs</h1>
        </ion-text>
        <ion-searchbar show-cancel-button="focus"
        debounce="300" @ionChange="filterSearchItems($event.target)"></ion-searchbar>
        <ion-list>
            <div animated="true" v-show="!p.hidePub" v-for="p in publicansPubs" :key="p['.key']">
                <pub-card :i="i" :pub="p" actionName="Manage" />
            </div>
        </ion-list>
      </template>
      <ion-item-divider v-if="user.userRoles && user.userRoles.punter === true && user.userRoles.publican === true">
      </ion-item-divider>
      <template v-if="user.userRoles && user.userRoles.punter === true">
        <ion-searchbar show-cancel-button="focus"
        debounce="300" @ionChange="filterSearchItems($event.target)"></ion-searchbar>
        <ion-list>
            <div animated="true" v-show="!p.hidePub" v-for="p in pubs" :key="p['.key']">
                <pub-card :i="i" :pub="p" actionName="Select" />
            </div>
        </ion-list>
      </template>
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
    },
    publicansPubs () {
      return this.$store.getters.publicansPubs
    },
    user () {
      return this.$store.getters.user
    }
  },
  created () {
    if (!this.pubs || this.pubs.length === 0) {
      this.$store.dispatch('fetchPubs')
    }
    if (!this.user || this.user.email === '') {
      this.$store.dispatch('fetchUserDetails')
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
