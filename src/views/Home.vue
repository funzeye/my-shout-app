<template>
  <ion-page>
    <the-header />
    <ion-content>
        <header>
        <div class="main-image">
        </div>
        <div class="main-message">
            <h2>Book your table in any pub</h2>
            <ion-button @click="onLogin" class="ion-margin-top" expand="block" size="large" v-if="!auth">
                Log in
            </ion-button>
            <ion-button @click="onSignup" class="ion-margin-top" expand="block" size="large" v-if="!auth">
                Sign up
            </ion-button>
            <ion-button @click="onSearch" class="ion-margin-top" expand="block" size="large" v-if="auth">
                Begin Search
            </ion-button>
        </div>
        </header>
    </ion-content>
  </ion-page>

</template>

<script>
import TheHeader from '../components/TheHeader.vue'

export default {
  name: 'home',
  components: {
    TheHeader
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogin: function () {
      this.$router.push('signin')
    },
    onSignup: function () {
      this.$router.push('signup')
    },
    onSearch: function () {
      this.$router.push({ name: 'search-for-pub' })
    }
  }
}
</script>

<style lang="scss" scoped>

header {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-size: cover;
    background-position: 50%;
    min-height: 500px;
    position: relative;
}

.main-image{
    display:flex;
    background-image: linear-gradient(90deg,rgba(47,45,65,.7),rgba(47,45,65,.7)), url('../assets/pexels-pixabay-63633.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.main-message{
    z-index: 1;
    h2 {
        font-weight: bold;
        color: #fff;
        text-align: center;
    }
}

ion-button{
    --margin-top: 1em;
}

</style>
