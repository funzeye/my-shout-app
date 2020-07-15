<template>
  <div id="app">
    <ion-app>
      <ion-vue-router main></ion-vue-router>
    </ion-app>
  </div>
</template>
<!--
<style src='@ionic/core/css/core.css'></style>
<style src='@ionic/core/css/ionic.bundle.css'></style>
-->

<script>
export default {
  name: 'app',
  created () {
  }
}
</script>

<style lang="css">

ion-tab ion-content {
  --ion-background-color: #f1f2f8;
}
ion-searchbar{
  --background: #fff !important;
}
ion-card, ion-card > ion-item, ion-card > ion-card-header, ion-card > ion-card-content{
  --background: #fff !important;
}
</style>
