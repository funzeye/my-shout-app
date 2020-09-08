import Vue from 'vue'
import globalAxios from 'axios'

const getDefaultState = () => {
  return {
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
      hidePub: false,
      ownerId: '',
      pubName: '',
      addressLine1: '',
      addressLine2: '',
      townCity: '',
      county: '',
      eircode: '',
      numOfTables: '',
      floors: { lower: 0, upper: 0 },
      timeToArrivalLimitOn: true,
      timeToArrivalLimitInMinutes: 30
    },
    pubFloorArea: {
      name: ''
    },
    pubFloorAreas: []
  }
}

const state = getDefaultState()

const mutations = {
  resetPubModuleState (state) {
    Object.assign(state, getDefaultState())
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
  updatePubInPubsCollection (state, pub) {
    console.log('updating pub in pubs array with key:', pub.key)
    var foundIndex = state.pubs.findIndex(x => x.key === pub.key)
    console.log('foundIndex: ', foundIndex)
    console.log('updated pubTable details: ', pub)
    Vue.set(state.pubs, foundIndex, pub)
    console.log('state.pubs: ', state.pubs)
  },
  storePubs (state, pubs) {
    state.pubs = pubs
  },
  storePubFloorAreas (state, pubFloorAreas) {
    state.pubFloorAreas = pubFloorAreas
  },
  addNewPubToPubsCollection (state, pub) {
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
  resetPub (state) {
    state.pub = {
      key: '',
      ownerId: '',
      pubName: '',
      hidePub: false,
      addressLine1: '',
      addressLine2: '',
      townCity: '',
      county: '',
      eircode: '',
      numOfTables: '',
      floors: { lower: 0, upper: 0 },
      timeToArrivalLimitOn: true,
      timeToArrivalLimitInMinutes: 30
    }
  }
}

const actions = {
  fetchPubs ({ commit, rootState }) {
    console.log('fecthing pub data from the DB and updating List')
    globalAxios.get('pubs.json')
      .then(response => {
        console.log(response)
        const data = response.data
        const resultArray = []
        for (const key in data) {
          data[key].key = key
          resultArray.push(data[key])
        }
        commit('storePubs', resultArray)
      }, error => {
        console.log(error)
      })
  },
  fetchPubTables ({ commit, rootState }, pubKey) {
    console.log('fecthing pub tables data from the DB and updating List')
    console.log('for pub with key:', pubKey)
    globalAxios.get('pubTables.json' + '?&orderBy="pubId"&equalTo="' + pubKey + '"')
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
  fetchPubByPubId ({ commit, rootState, dispatch }, pubId) {
    console.log('fecthing pub data from the DB')
    console.log('for pub with pub id:', pubId)
    globalAxios.get('pubs.json' + '?&orderBy="$key"&equalTo="' + pubId + '"')
      .then(response => {
        console.log('fetchPubByPubId response: ', response)
        const data = response.data
        const resultArray = []
        for (const key in data) {
          console.log('fetchPubByPubId key: ', key)
          data[key].key = key
          console.log('fetchPubByPubId data[key]: ', data[key])
          resultArray.push(data[key])
        }
        if (resultArray.length > 0) {
          commit('updatePub', resultArray[0])
          dispatch('fetchPubTables', state.pub.key)
          dispatch('reservationModule/fetchReservationsForPub', state.pub.key, { root: true })
        }
      }, error => {
        console.log(error)
      })
  },
  fetchPubFloorAreas ({ commit, rootState }) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('fecthing pub data from the DB and updating List')
    globalAxios.get('pubFloorAreas.json' + '?auth=' + rootState.userModule.idToken)
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
  storePub ({ commit, rootState, dispatch }, pubData) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('adding new pub to DB: ', pubData)
    const pub = {
      ownerId: localStorage.getItem('userId'),
      pubName: pubData.pubName,
      addressLine1: pubData.addressLine1,
      addressLine2: pubData.addressLine2,
      townCity: pubData.townCity,
      county: pubData.county,
      eircode: pubData.eircode,
      numOfTables: pubData.numOfTables,
      floors: { lower: pubData.floors.lower, upper: pubData.floors.upper },
      timeToArrivalLimitOn: pubData.timeToArrivalLimitOn,
      timeToArrivalLimitInMinutes: pubData.timeToArrivalLimitInMinutes
    }
    globalAxios.post('pubs.json' + '?auth=' + rootState.userModule.idToken, pub)
      .then(res => {
        console.log('adding new pub response:', res)
        pub.key = res.data.name
        commit('addNewPubToPubsCollection', pub)
        commit('updatePub', pub)
        console.log('pub successfully saved to DB: ', res.data)
        dispatch('storePubTables', res.data.name)
        // commit('resetPub') // no longer need to reset as we immediately go to a new page
      })
      .catch(error => console.log(error))
  },
  updatePubDetailsInDb ({ commit, rootState }, pubData) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('updating pub in DB: ', pubData)

    globalAxios.patch('pubs/' + pubData.key + '/.json' + '?auth=' + rootState.userModule.idToken, pubData)
      .then(res => {
        console.log('updating pub response:', res)
        commit('updatePubInPubsCollection', pubData)
        console.log('pub successfully updated in DB: ', res.data)
        // dispatch('storePubTables', res.data.name)
        // commit('resetPub') // no longer need to reset as we immediately go to a new page
      })
      .catch(error => console.log(error))
  },
  storePubFloorArea ({ commit, rootState }, pubFloorAreaData) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('adding new pub floor area to DB: ', pubFloorAreaData)
    globalAxios.post('pubFloorAreas.json' + '?auth=' + rootState.userModule.idToken, pubFloorAreaData)
      .then(res => {
        console.log(res)
        commit('addNewPubFloorArea', pubFloorAreaData)
        console.log('pub successfully saved to DB: ', res.data)
        commit('resetPubFloorArea') // no longer need to reset as we immediately go to a new page
      })
      .catch(error => console.log(error))
  },
  updatePubTable ({ commit, rootState }, pubTable) {
    if (!rootState.userModule.idToken) {
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
    globalAxios.patch('pubTables/' + pubTable.key + '.json' + '?auth=' + rootState.userModule.idToken, table)
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
  storePubTables ({ commit, rootState }, pubId) {
    if (!rootState.userModule.idToken) {
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
      globalAxios.post('pubTables.json' + '?auth=' + rootState.userModule.idToken, table)
        .then(res => {
          console.log(res)
          table.key = res.data.name
          commit('addNewPubTable', table)
          console.log('table successfully saved to DB.')
        })
        .catch(error => console.log(error))
    }
  },
  fetchPubTable ({ commit, rootState }, pubTableKey) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('fecthing pub table data from the DB')
    globalAxios.get('pubTables.json' + '?auth=' + rootState.userModule.idToken + '&orderBy="$key"&equalTo="' + pubTableKey + '"')
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
  updatePub ({ commit }, payload) {
    commit('updatePub', payload)
  },
  setPubs ({ commit }, payload) {
    commit('storePubs', payload)
  },
  setSelectedPubTable ({ commit }, payload) {
    console.log('calling setSelectedPubTable action in index.js')
    commit('setSelectedPubTable', payload)
  },
  updatePubFloorArea ({ commit }, payload) {
    commit('updatePubFloorArea', payload)
  }
}

const getters = {
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
  publicansPub (state, getters, rootState, rootGetters) {
    console.log('executing publicansPub getter')

    console.log('rootGetters[userModule/userId] found?:', rootGetters['userModule/userId'] !== '')
    console.log('state.pubs:', state.pubs)
    var publicansPub = state.pubs.find(p => p.ownerId === rootGetters['userModule/userId'])
    console.log('publicansPub found in getter:', publicansPub)

    return publicansPub
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
