<template>
  <div class="ion-page">
    <the-header />
    <ion-content class="ion-padding">
      <h1>About Page</h1>
    </ion-content>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'

export default {
  name: 'about',
  components: {
    TheHeader
  }
}
</script>
