<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <table-card :i="i" />
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
  props: ['i']
}

</script>
