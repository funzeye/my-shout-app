import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import globalAxios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    pubs: [],
    pub: {
      pubName: '',
      addressLine1: '',
      addressLine2: '',
      townCity: '',
      county: '',
      eircode: '',
      numOfTables: ''
    }
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    },
    storeUser (state, user) {
      state.user = user
    },
    storePubs (state, pubs) {
      state.pubs = pubs
    },
    addNewPub (state, pub) {
      state.pubs.push(pub)
    },
    updatePub (state, pub) {
      state.pub = pub
    },
    resetPub (state) {
      state.pub = {
        pubName: '',
        addressLine1: '',
        addressLine2: '',
        townCity: '',
        county: '',
        eircode: '',
        numOfTables: ''
      }
    }
  },
  actions: {
    setLogoutTimer ({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },
    signup ({ commit, dispatch }, authData) {
      axios.post(':signUp?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
        { email: authData.email, password: authData.password, returnSecureToken: true })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate.getTime())
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/')
        })
        .catch(error => console.log(error))
    },
    signin ({ commit, dispatch }, authData) {
      axios.post(':signInWithPassword?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
        { email: authData.email, password: authData.password, returnSecureToken: true })
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate.getTime())
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/')
        })
        .catch(error => console.log(error))
    },
    tryAutoSignin ({ commit, dispatch }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date().getTime()
      if (now >= expirationDate) {
        return // token has expired
      }

      const userId = localStorage.getItem('userId')
      dispatch('setLogoutTimer', (expirationDate - now) / 1000)
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    fetchPubs ({ commit, state }) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing pub data from the DB and updating List')
      globalAxios.get('pub.json' + '?auth=' + state.idToken)
        .then(response => {
          console.log(response)
          const data = response.data
          const resultArray = []
          for (const key in data) {
            resultArray.push(data[key])
          }
          commit('storePubs', resultArray)
        }, error => {
          console.log(error)
        })
    },
    storeUser ({ commit, state }, userData) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      globalAxios.post('users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    storePub ({ commit, state }, pubData) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('adding new pub to DB: ', pubData)
      globalAxios.post('pub.json' + '?auth=' + state.idToken, pubData)
        .then(res => {
          console.log(res)
          commit('addNewPub', pubData)
          commit('resetPub')
        })
        .catch(error => console.log(error))
    },
    fetchUser ({ commit, state }) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing user data from the DB and updating List')
      globalAxios.get('users.json' + '?auth=' + state.idToken)
        .then(response => {
          console.log(response)
          const data = response.data
          const users = []
          for (const key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          commit('storeUser', users[0]) // not a good real world example - should be getting the exact user - not the first one in list!
        }, error => {
          console.log(error)
        })
    },
    updatePub ({ commit }, payload) {
      commit('updatePub', payload)
    },
    logout ({ commit }) {
      router.replace('/signin')
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
    }
  },
  getters: {
    user (state) {
      console.log('calling user getter')
      return state.user
    },
    pubs (state) {
      console.log('calling pubs getter')
      console.log(state)
      return state.pubs
    },
    pub (state) {
      console.log('calling pub getter')
      console.log(state)
      return state.pub
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  },
  modules: {
  }
})
