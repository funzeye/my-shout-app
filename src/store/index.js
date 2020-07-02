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
    user: {
      email: '',
      userId: null,
      firstName: '',
      surname: ''
    },
    pubs: [],
    pubTables: [],
    pubTable: {
      key: '',
      seats: 4,
      tableNum: null,
      pubFloorArea: '',
      floor: null
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
    pubFloorAreas: [],
    activeReservationForPub: {
      key: '',
      tableId: '',
      reservedBy: '',
      reservedAtDate: '',
      isActive: false,
      userDetails: null
    },
    reservations: []
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
    setStateActiveReservationForPub (state, reservation) {
      state.activeReservationForPub = reservation
    },
    storeUserDetails (state, userData) {
      state.user.email = userData.email
      state.user.userId = userData.userId
      state.user.firstName = userData.firstName
      state.user.surname = userData.surname
    },
    removeReservationFromCollection (state, reservationKey) {
      console.log('removing reservation from collection:', reservationKey)
      console.log('reservation collection before:', state.reservations)
      state.reservations = state.reservations.filter(item => item.key !== reservationKey)
      console.log('reservation collection after:', state.reservations)
    },
    addReservationToCollection (state, reservation) {
      console.log('reservation saved to state collection:', reservation)
      state.reservations.push(reservation)
    },
    storePubTable (state, user) {
      state.pubTable = user
    },
    storePubTables (state, pubTables) {
      state.pubTables = pubTables
    },
    updatePubTableInPubTables (state, { pubTable, key }) {
      console.log('updating pub table in pubTables array with key:', key)
      var foundIndex = state.pubTables.findIndex(x => x.key === key)
      console.log('foundIndex: ', foundIndex)
      console.log('updated pubTable details: ', pubTable)
      Vue.set(state.pubTables, foundIndex, pubTable)
      console.log('state.pubTables: ', state.pubTables)
    },
    storePubs (state, pubs) {
      state.pubs = pubs
    },
    setCurrentReservation (state, reservation) {
      state.reservation = reservation
    },
    setReservations (state, reservations) {
      state.reservations = reservations
      console.log('state.reservations:', state.reservations)
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
      console.log('calling setSelectedPubTable mutation in index.js')
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
    resetCurrentReservation (state) {
      state.reservation = {
        key: '',
        tableId: '',
        reservedBy: '',
        reservedAtDate: '',
        isActive: false,
        userDetails: null
      }
      console.log('current reservation state reset to nothing')
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
          dispatch('storeUserDetails', {
            email: authData.email,
            firstName: authData.firstName,
            surname: authData.surname,
            userId: res.data.localId
          })
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
          dispatch('storeUserDetails', {
            email: authData.email,
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
            data[key].key = key
            resultArray.push(data[key])
          }
          commit('storePubTables', resultArray)
        }, error => {
          console.log(error)
        })
    },
    fetchReservationsForPub ({ commit, state }, pubKey) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing pub table reservation data from the DB and updating List')
      console.log('for pub with key:', pubKey)
      globalAxios.get('reservations.json' + '?auth=' + state.idToken +
        '&orderBy="pubId"&equalTo="' + pubKey + '"')
        .then(response => {
          console.log(response)
          const data = response.data
          const resultArray = []
          const todaysDate = new Date()
          for (const key in data) {
            console.log('reserved at date:', data[key].reservedAtDate)
            const reservedAtDateStringAsDate = new Date(data[key].reservedAtDate)
            const reservationIsToday = todaysDate.getDate() === reservedAtDateStringAsDate.getDate() &&
              todaysDate.getMonth() === reservedAtDateStringAsDate.getMonth() &&
              todaysDate.getFullYear() === reservedAtDateStringAsDate.getFullYear()
            if (data[key].isActive && reservationIsToday) {
              // retrieve user details and append to reservation object as an inner object
              console.log('getting userdetails for user with id of:', data[key].reservedBy)
              globalAxios.get('usersDetails.json' + '?auth=' + state.idToken +
                '&orderBy="userId"&equalTo="' + data[key].reservedBy + '"')
                .then(response => {
                  console.log(response)
                  const userData = response.data
                  const usesDetailsResultArray = []
                  for (const dataKey in userData) {
                    console.log('fetch user details key inside: ', dataKey)
                    console.log('user details userData[key]: ', userData[dataKey])
                    usesDetailsResultArray.push(userData[dataKey])
                  }
                  data[key].key = key
                  data[key].userDetails = usesDetailsResultArray[0]
                  console.log('pushing reservation to resultArray:', data[key])
                  resultArray.push(data[key])
                })
            } else if (!reservationIsToday) {
              console.log('reservation not added as it is not todays date')
            } else if (!data[key].isActive) {
              console.log('reservation not added as it is not active')
            }
          }
          commit('setReservations', resultArray) // TODO might speed things up if I add to collection inside loop...
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
          if (resultArray.length > 0) {
            commit('updatePub', resultArray[0]) // TODO
            dispatch('fetchPubTables', state.pub.key)
            dispatch('fetchReservationsForPub', state.pub.key)
          }
        }, error => {
          console.log(error)
        })
    },
    fetchUserDetails ({ commit, state, dispatch }) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing user details data from the DB')
      console.log('for user details with user id:', state.userId)
      globalAxios.get('usersDetails.json' + '?auth=' + state.idToken + '&orderBy="userId"&equalTo="' + state.userId + '"')
        .then(response => {
          console.log('fetchUserDetails response: ', response)
          const data = response.data
          const resultArray = []
          for (const key in data) {
            console.log('fetchUserDetailsa key: ', key)
            data[key].key = key
            console.log('fetchUserDetails data[key]: ', data[key])
            resultArray.push(data[key])
          }
          if (resultArray.length > 0) {
            commit('storeUserDetails', resultArray[0]) // TODO
          }
        }, error => {
          console.log(error)
        })
    },
    fetchReservationForPunter ({ commit, state, dispatch }, userId) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('fecthing reservation from the DB')
      console.log('for user id:', userId)
      globalAxios.get('reservations.json' + '?auth=' + state.idToken + '&orderBy="reservedBy"&equalTo="' + userId + '"') // TODO limit to todays date
        .then(response => {
          console.log('fetchPub response: ', response)
          const data = response.data
          const resultArray = []
          for (const key in data) {
            console.log('fetchReservation key: ', key)
            data[key].key = key
            console.log('fetchReservation data[key]: ', data[key])
            resultArray.push(data[key])
          }
          commit('setCurrentReservation', resultArray[0]) // TODO
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
      globalAxios.get('pubFloorAreas.json' + '?auth=' + state.idToken)
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
    storeUserDetails ({ commit, state }, userData) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      globalAxios.post('usersDetails.json' + '?auth=' + state.idToken, userData)
        .then(res => {
          console.log(res)
          commit('storeUserDetails', {
            email: userData.email,
            userId: userData.userId,
            firstName: userData.firstName,
            surname: userData.surname
          })
        })
        .catch(error => console.log(error))
    },
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
      globalAxios.post('pubFloorAreas.json' + '?auth=' + state.idToken, pubFloorAreaData)
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
        pubFloorArea: pubTable.pubFloorArea,
        floor: pubTable.floor
      }
      console.log('updating existing pub table in DB: ', table)
      globalAxios.patch('pubTables/' + pubTable.key + '.json' + '?auth=' + state.idToken, table)
        .then(res => {
          console.log(res)
          console.log('pub table successfully saved to DB: ', res.data)
          console.log('about to update pub table in pub tables from action with key:', pubTable.key)
          commit('updatePubTableInPubTables', {
            pubTable: pubTable,
            key: pubTable.key
          })
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

      let defaultFloor = 0
      if (state.pub.floors.lower > 0) {
        defaultFloor = state.pub.floors.lower
      } else if (state.pub.floors.upper < 0) {
        defaultFloor = state.pub.floors.upper
      }

      for (var index = 1; index <= state.pub.numOfTables; index++) {
        const table = {
          pubId: pubId,
          tableNum: index,
          seats: 4,
          floor: defaultFloor
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
      console.log('calling setSelectedPubTable action in index.js')
      commit('setSelectedPubTable', payload)
    },
    setActiveReservationForPub ({ commit }, payload) {
      console.log('calling setActiveReservationForPub action in index.js')
      commit('setStateActiveReservationForPub', payload)
    },
    updatePubFloorArea ({ commit }, payload) {
      commit('updatePubFloorArea', payload)
    },
    cancelReservation ({ commit, state }, pubTableKey) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      console.log('cancelling reservation in DB for table: ', pubTableKey)

      const resFromArray = state.reservations.filter(res => res.tableId === pubTableKey)[0] // TODO better way to get this??
      const reservation = {
        tableId: resFromArray.tableId,
        isActive: false,
        key: null,
        pubId: resFromArray.pubId,
        reservedAtDate: resFromArray.reservedAtDate,
        reservedBy: resFromArray.reservedBy,
        userDetails: null
      }
      const resKey = resFromArray.key

      // update record but don't delete it
      globalAxios.patch('reservations/' + resKey + '.json' + '?auth=' + state.idToken, reservation)
        .then(res => {
          console.log(res)
          console.log('reservation successfully cancelled in DB: ', res.data)
          console.log('about to reset reservation...')
          commit('resetCurrentReservation')
          commit('removeReservationFromCollection', resKey)
        })
        .catch(error => console.log(error))
    },
    createReservation ({ commit, state }) {
      if (!state.idToken) {
        console.log('No Id Token - Exiting')
        return
      }
      const reservation = {
        tableId: state.pubTable.key,
        pubId: state.pubTable.pubId,
        reservedBy: state.userId,
        reservedAtDate: new Date(),
        isActive: true
      }

      console.log('adding new reservation to DB: ', reservation)
      globalAxios.post('reservations.json' + '?auth=' + state.idToken, reservation)
        .then(res => {
          console.log('new reservatioon data:', res)
          globalAxios.get('usersDetails.json' + '?auth=' + state.idToken +
          '&orderBy="userId"&equalTo="' + reservation.reservedBy + '"')
            .then(response => {
              console.log(response)
              const userData = response.data
              const usesDetailsResultArray = []
              for (const dataKey in userData) {
                console.log('fetch user details key inside: ', dataKey)
                console.log('user details userData[key]: ', userData[dataKey])
                usesDetailsResultArray.push(userData[dataKey])
              }
              reservation.key = res.data.name
              reservation.userDetails = usesDetailsResultArray[0]

              // commit('setCurrentReservation', reservation)
              commit('addReservationToCollection', reservation)
              console.log('reservation successfully saved to DB: ', res.data)
            })
        })
        .catch(error => console.log(error))
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
      console.log('calling pubTable getter in index.js')
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
    },
    activeReservationforPub (state) {
      console.log('calling current reservation getter')
      return state.reservation
    },
    reservations (state) {
      console.log('calling reservations getter')
      return state.reservations
    }
  },
  modules: {
  }
})
