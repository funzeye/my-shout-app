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
    // user: null,
    pubs: [],
    pubTables: [],
    pubTable: {
      key: '',
      seats: 4,
      tableNum: null,
      pubFloorArea: ''
    },
    pub: {
      key: '',
      userId: '',
      pubName: '',
      addressLine1: '',
      addressLine2: '',
      townCity: '',
      county: '',
      eircode: '',
      numOfTables: '',
      floors: { lower: 0, upper: 0 }
    },
    pubFloorArea: {
      name: ''
    },
    pubFloorAreas: []
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
    // storeUser (state, user) {
    //  state.user = user
    // },
    storePubTable (state, user) {
      state.pubTable = user
    },
    storePubTables (state, pubTables) {
      state.pubTables = pubTables
    },
    storePubs (state, pubs) {
      state.pubs = pubs
    },
    storePubFloorAreas (state, pubFloorAreas) {
      state.pubFloorAreas = pubFloorAreas
    },
    addNewPub (state, pub) {
      state.pubs.push(pub)
    },
    addNewPubFloorArea (state, pub) {
      state.pubFloorAreas.push(pub)
    },
    addNewPubTable (state, pubTable) {
      state.pubTables.push(pubTable)
    },
    updatePub (state, pub) {
      state.pub = pub
    },
    setSelectedPubTable (state, pubTable) {
      state.pubTable = pubTable
    },
    updatePubFloorArea (state, pubFloorArea) {
      state.pubFloorArea = pubFloorArea
    },
    resetPubFloorArea (state) {
      state.pubFloorArea = {
        name: ''
      }
    },
    resetPub (state) {
      state.pub = {
        key: '',
        userId: '',
        pubName: '',
        addressLine1: '',
        addressLine2: '',
        townCity: '',
        county: '',
        eircode: '',
        numOfTables: '',
        floors: { lower: 0, upper: 0 }
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
          // dispatch('storeUser', authData)
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
      globalAxios.get('pubs.json' + '?auth=' + state.idToken)
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
    fetchPubTables ({ commit, state }, pubKey) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing pub tables data from the DB and updating List')
      console.log('for pub with key:', pubKey)
      globalAxios.get('pubTables.json' + '?auth=' + state.idToken + '&orderBy="pubId"&equalTo="' + pubKey + '"')
        .then(response => {
          console.log(response)
          const data = response.data
          const resultArray = []
          for (const key in data) {
            resultArray.push(data[key])
          }
          commit('storePubTables', resultArray)
        }, error => {
          console.log(error)
        })
    },
    fetchPub ({ commit, state, dispatch }, userId) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing pub data from the DB')
      console.log('for pub with user id:', userId)
      globalAxios.get('pubs.json' + '?auth=' + state.idToken + '&orderBy="userId"&equalTo="' + userId + '"')
        .then(response => {
          console.log('fetchPub response: ', response)
          const data = response.data
          const resultArray = []
          for (const key in data) {
            console.log('fetchPub key: ', key)
            data[key].key = key
            console.log('fetchPub data[key]: ', data[key])
            resultArray.push(data[key])
          }
          commit('updatePub', resultArray[0]) // TODO
          dispatch('fetchPubTables', state.pub.key)
        }, error => {
          console.log(error)
        })
    },
    fetchPubFloorAreas ({ commit, state }) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing pub data from the DB and updating List')
      globalAxios.get('pubFloorArea.json' + '?auth=' + state.idToken)
        .then(response => {
          console.log(response)
          const data = response.data
          const resultArray = []
          for (const key in data) {
            resultArray.push(data[key])
          }
          commit('storePubFloorAreas', resultArray)
        }, error => {
          console.log(error)
        })
    },
    // storeUser ({ commit, state }, userData) {
    //  if (!state.idToken) {
    //    console.log('No Id Token - Exiting')
    //    return
    //  }
    //  globalAxios.post('users.json' + '?auth=' + state.idToken, userData)
    //    .then(res => console.log(res))
    //    .catch(error => console.log(error))
    // },
    storePub ({ commit, state, dispatch }, pubData) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('adding new pub to DB: ', pubData)
      const pub = {
        userId: localStorage.getItem('userId'),
        pubName: pubData.pubName,
        addressLine1: pubData.addressLine1,
        addressLine2: pubData.addressLine2,
        townCity: pubData.townCity,
        county: pubData.county,
        eircode: pubData.eircode,
        numOfTables: pubData.numOfTables,
        floors: { lower: pubData.floors.lower, upper: pubData.floors.upper }
      }
      globalAxios.post('pubs.json' + '?auth=' + state.idToken, pub)
        .then(res => {
          console.log('adding new pub response:', res)
          pubData.key = res.data.name
          commit('addNewPub', pubData)
          console.log('pub successfully saved to DB: ', res.data)
          dispatch('storePubTables', res.data.name)
          // commit('resetPub') // no longer need to reset as we immediately go to a new page
        })
        .catch(error => console.log(error))
    },
    storePubFloorArea ({ commit, state }, pubFloorAreaData) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('adding new pub floor area to DB: ', pubFloorAreaData)
      globalAxios.post('pubFloorArea.json' + '?auth=' + state.idToken, pubFloorAreaData)
        .then(res => {
          console.log(res)
          commit('addNewPubFloorArea', pubFloorAreaData)
          console.log('pub successfully saved to DB: ', res.data)
          commit('resetPubFloorArea') // no longer need to reset as we immediately go to a new page
        })
        .catch(error => console.log(error))
    },
    updatePubTable ({ commit, state }, pubTable) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      const table = {
        pubId: pubTable.pubId,
        tableNum: pubTable.tableNum,
        seats: pubTable.seats,
        pubFloorArea: pubTable.pubFloorArea
      }
      console.log('updating existing pub table in DB: ', table)
      globalAxios.patch('pubtables/' + pubTable.key + '.json' + '?auth=' + state.idToken, table)
        .then(res => {
          console.log(res)
          console.log('pub table successfully saved to DB: ', res.data)
        })
        .catch(error => console.log(error))
    },
    storePubTables ({ commit, state }, pubId) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('adding new tables to DB')
      console.log('number of tables to add:', state.pub.numOfTables)

      for (var index = 1; index <= state.pub.numOfTables; index++) {
        const table = {
          pubId: pubId,
          tableNum: index,
          seats: 4
        }
        console.log('adding new table:', table)
        globalAxios.post('pubTables.json' + '?auth=' + state.idToken, table)
          .then(res => {
            console.log(res)
            table.key = res.data.name
            commit('addNewPubTable', table)
            console.log('table successfully saved to DB.')
          })
          .catch(error => console.log(error))
      }
    },
    fetchPubTable ({ commit, state }, pubTableKey) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing pub table data from the DB')
      globalAxios.get('pubTables.json' + '?auth=' + state.idToken + '&orderBy="$key"&equalTo="' + pubTableKey + '"')
        .then(response => {
          console.log('Successful response upon getting single pub table data from the DB')
          console.log(response)
          const data = response.data
          const pubTables = []
          for (const key in data) {
            console.log('looping through keys found in data for fecthPubTable call')
            const pubTable = data[key]
            console.log('pubTable:', pubTable)
            pubTable.key = key
            pubTables.push(pubTable)
          }
          commit('storePubTable', pubTables[0])
        }, error => {
          console.log('Error response while getting single pub table data from the DB')
          console.log(error)
        })
    },
    // fetchUser ({ commit, state }) {
    //  if (!state.idToken) {
    //     console.log('No Id Token - Exiting')
    //     return
    //   }
    //   console.log('fecthing user data from the DB and updating List')
    //   globalAxios.get('users.json' + '?auth=' + state.idToken)
    //     .then(response => {
    //       console.log(response)
    //       const data = response.data
    //       const users = []
    //       for (const key in data) {
    //         const user = data[key]
    //         user.id = key
    //         users.push(user)
    //       }
    //       // commit('storeUser', users[0]) // TODO not a good real world example - should be getting the exact user - not the first one in list!
    //     }, error => {
    //       console.log(error)
    //     })
    // },
    updatePub ({ commit }, payload) {
      commit('updatePub', payload)
    },
    setSelectedPubTable ({ commit }, payload) {
      commit('setSelectedPubTable', payload)
    },
    updatePubFloorArea ({ commit }, payload) {
      commit('updatePubFloorArea', payload)
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
    // user (state) {
    //  console.log('calling user getter')
    //  return state.user
    // },
    userId (state) {
      console.log('calling user id getter')
      return state.userId
    },
    pubs (state) {
      console.log('calling pubs getter')
      console.log(state)
      return state.pubs
    },
    pubTables (state) {
      console.log('calling pubTables getter')
      console.log(state)
      return state.pubTables
    },
    pubTable (state) {
      console.log('calling pubTable getter')
      console.log(state)
      return state.pubTable
    },
    pub (state) {
      console.log('calling pub getter')
      console.log(state)
      return state.pub
    },
    pubFloorAreas (state) {
      console.log('calling pub floor areas getter')
      console.log(state)
      return state.pubFloorAreas
    },
    pubFloorArea (state) {
      console.log('calling pub floor area getter')
      console.log(state)
      return state.pubFloorArea
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  },
  modules: {
  }
})
