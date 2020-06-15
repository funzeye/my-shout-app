<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>My Shout!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <table-card :i="i" />
    </ion-content>
  </div>
</template>

<script>
import TableCard from '../components/TableCard.vue'

export default {

  name: 'home',
  components: {
    TableCard
  },
  props: ['i'],
  methods: {
    navigate: function () {
      this.$router.push('about')
    }
  }
}

</script>
