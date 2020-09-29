import Vue from 'vue'

import { defineCustomElements } from '@ionic/pwa-elements/loader'

import App from './App.vue'

import axios from 'axios'

import './registerServiceWorker'

import router from './router'
// import VueResource from 'vue-resource'
import store from './store'
import Ionic from '@ionic/vue'
import Vuelidate from 'vuelidate'

import '@ionic/core/css/ionic.bundle.css'
import '@ionic/core/css/core.css'

import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'

/// /////////////// FIREBASE SETUP
var firebaseConfig = {
  apiKey: 'AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
  authDomain: 'myshout-app.firebaseapp.com',
  databaseURL: 'https://myshout-app.firebaseio.com',
  projectId: 'myshout-app',
  storageBucket: 'myshout-app.appspot.com',
  messagingSenderId: '99944916740',
  appId: '1:99944916740:web:2ee7fe3bcb77d6402bd251'
}
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.filter('formatDate', function (value) {
  if (value) {
    return new Date(value).toLocaleTimeString() + ' (' + new Date(value).toDateString() + ')'
  }
})

Vue.use(Ionic)
// Vue.use(VueResource)
// Vue.http.options.root = 'https://myshout-app.firebaseio.com/pub.json'
axios.defaults.baseURL = 'https://myshout-app.firebaseio.com/'

store.dispatch('userModule/checkAuth').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

defineCustomElements(window)
