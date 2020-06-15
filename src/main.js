import Vue from 'vue'

import App from './App.vue'
// import './registerServiceWorker'

import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import Ionic from '@ionic/vue'

import '@ionic/core/css/ionic.bundle.css'
import '@ionic/core/css/core.css'

Vue.config.productionTip = false

Vue.use(Ionic)
Vue.use(VueResource)
Vue.http.options.root = 'https://myshout-app.firebaseio.com/pub.json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
