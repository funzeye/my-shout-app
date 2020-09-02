import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './modules/userModule'
import pubModule from './modules/pubModule'
import reservationModule from './modules/reservationModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    pubModule,
    reservationModule
  }
})
