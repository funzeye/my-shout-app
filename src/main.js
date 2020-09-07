import Vue from 'vue'

import App from './App.vue'
import './registerServiceWorker'
import axios from 'axios'

import router from './router'
// import VueResource from 'vue-resource'
import store from './store'
import Ionic from '@ionic/vue'
import Vuelidate from 'vuelidate'

import '@ionic/core/css/ionic.bundle.css'
import '@ionic/core/css/core.css'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
