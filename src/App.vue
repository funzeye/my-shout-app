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
ion-searchbar {
  --background: #fff !important;
}

ion-card {
  --ion-item-background: #fff;
}
ion-card ion-card-header {
  --background: #406c6c;
}

ion-card ion-card-title {
  --color: #fff;
}

ion-card-header ion-text {
  --background: #406c6c;
  color: #eee;
}

ion-card ion-card-subtitle {
  --color: #88b4b3
}

ion-card-header+.card-content-md {
    padding-top: 16px;
}

ion-card-content ion-label{
  color: #666 !important
}
</style>
