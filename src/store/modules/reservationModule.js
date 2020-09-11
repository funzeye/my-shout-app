import globalAxios from 'axios'
import Vue from 'vue'
import { loadingController } from '@ionic/core'

const getDefaultState = () => {
  return {
    activeReservationForPunter: {
      key: '',
      tableId: '',
      reservedBy: '',
      reservedByOwner: false,
      reservedAtDate: '',
      patronDetails: null
    },
    activeReservationForPub: {
      key: '',
      tableId: '',
      reservedBy: '',
      reservedByOwner: false,
      reservedAtDate: '',
      patronDetails: null
    },
    previousReservationsForPunter: [],
    allReservationsForPub: []
  }
}
const state = getDefaultState()

const mutations = {
  resetReservationModuleState (state) {
    Object.assign(state, getDefaultState())

    // Object.assign(state, initialState())

    // acquire initial state
    // const s = initialState()
    // Object.keys(s).forEach(key => {
    //   state[key] = s[key]
    // })
  },
  setStateActiveReservationForPub (state, reservation) {
    state.activeReservationForPub = reservation
  },
  removeReservationFromCollection (state, reservationKey) {
    console.log('removing reservation from collection:', reservationKey)
    console.log('reservation collection before:', state.allReservationsForPub)
    state.allReservationsForPub = state.allReservationsForPub.filter(item => item.key !== reservationKey)
    console.log('reservation collection after:', state.allReservationsForPub)
  },
  addReservationToCollection (state, reservation) {
    console.log('reservation saved to state collection:', reservation)
    state.allReservationsForPub.push(reservation)
  },
  updateReservationInCollection (state, reservation) {
    console.log('updating reservation in reservation array with key:', reservation.key)
    var foundIndex = state.allReservationsForPub.findIndex(x => x.key === reservation.key)
    console.log('foundIndex: ', foundIndex)
    console.log('updated reservation details: ', reservation)
    Vue.set(state.allReservationsForPub, foundIndex, reservation)
    console.log('state.pubs: ', state.pubs)
  },
  setCurrentReservation (state, reservation) {
    state.reservation = reservation
  },
  setCurrentReservationForPunter (state, reservation) {
    state.activeReservationForPunter = reservation
  },
  setPreviousReservationsForPunter (state, reservations) {
    state.previousReservationsForPunter = reservations
  },
  setReservationsForPub (state, reservations) {
    console.log('parameter:', reservations)
    state.allReservationsForPub = reservations
    console.log('state.allReservationsForPub:', state.allReservationsForPub)
  },
  resetReservationsForPubCollection (state) {
    state.allReservationsForPub = []
  },
  resetCurrentReservationForPunter (state) {
    state.activeReservationForPunter = {
      key: '',
      tableId: '',
      reservedBy: '',
      reservedByOwner: false,
      reservedAtDate: '',
      patronDetails: null
    }
  },
  resetCurrentReservation (state) {
    state.activeReservationForPub = {
      key: '',
      tableId: '',
      reservedBy: '',
      reservedAtDate: '',
      reservedByOwner: false,
      patronDetails: null
    }
    console.log('current reservation state reset to nothing')
  }
}

const actions = {
  fetchReservationsForPub ({ commit, rootState }, pubKey) {
    console.log('fecthing pub table reservation data from the DB and updating List')
    console.log('for pub with key:', pubKey)
    commit('resetReservationsForPubCollection')
    globalAxios.get('reservations.json' + '?orderBy="pub/pubId"&equalTo="' + pubKey + '"')
      .then(response => {
        console.log('fetchReservationsForPub response:', response)
        const data = response.data
        // const resultArray = []
        for (const key in data) {
          if (!data[key].isCancelled) {
            if (!rootState.userModule.idToken) {
              data[key].key = key
              console.log('pushing reservation to resultArray:', data[key])
              commit('addReservationToCollection', data[key])
              console.log('No Id Token - Exiting')
            } else if (data[key].reservedByOwner && rootState.pubModule.pub.ownerId !== rootState.userModule.userId) {
              console.log('reserved by owner but you are not the owner')
              data[key].key = key
              console.log('pushing reservation to resultArray:', data[key])
              commit('addReservationToCollection', data[key])
              console.log('Cannot add user details as logged in user does not have permission to view this users details')
            } else if (data[key].reservedByOwner === false && data[key].reservedBy !== rootState.userModule.userId && rootState.pubModule.pub.ownerId !== rootState.userModule.userId) {
              console.log('it was not reserved by the owner and you also didnt reserve it and you are also not the onwer')
              data[key].key = key
              console.log('pushing reservation to resultArray:', data[key])
              commit('addReservationToCollection', data[key])
              console.log('Cannot add user details as logged in user does not have permission to view this users details')
            } else {
              console.log('data[key].reservedBy !== rootState.userModule.userId', data[key].reservedBy !== rootState.userModule.userId)
              console.log('!data[key].reservedByOwner', !data[key].reservedByOwner)
              console.log('rootState.pubModule.pub.ownerId !== rootState.userModule.userId', rootState.pubModule.pub.ownerId !== rootState.userModule.userId)
              // retrieve user details and append to reservation object as an inner object
              data[key].key = key
              console.log('getting userdetails for user with id of:', data[key].reservedBy)
              globalAxios.get('reservationsPatronDetails/' + data[key].key + '.json' + '?auth=' + rootState.userModule.idToken)
                .then(response => {
                  console.log('reservationsPatronDetails.json:', response)
                  const userData = response.data
                  const usesDetailsResultArray = []

                  usesDetailsResultArray.push(userData)

                  data[key].patronDetails = usesDetailsResultArray[0]
                  console.log('pushing reservation to resultArray:', data[key])
                  // resultArray.push(data[key])
                  commit('addReservationToCollection', data[key])
                })
            }
          } else if (data[key].isCancelled) {
            console.log('reservation not added as it is a cancelled reservation')
          } else {
            console.log('reservation not added for unknown reason')
          }
        }
      }, error => {
        console.log(error)
      })
  },
  fetchReservationsForPunter ({ commit, rootState }, userId) {
    console.log('executing fetchReservationsForPunter')

    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('localStorage.getItem("isPunter")', localStorage.getItem('isPunter'))
    if (localStorage.getItem('isPunter') === null || localStorage.getItem('isPunter') === 'false') {
      console.log('current user is not a punter - Exiting')
      return
    } else {
      console.log('isPunter:', localStorage.getItem('isPunter'))
    }
    console.log('fecthing reservations from the DB for punter')
    console.log('for user id:', userId)
    globalAxios.get('reservations.json' + '?auth=' + rootState.userModule.idToken +
     '&orderBy="reservedBy"&equalTo="' + userId + '"')
      .then(response => {
        console.log('fetchReservationsForPunter response: ', response)
        const data = response.data
        const resultArray = []
        const previousReservationsForPunterArray = []
        const todaysDate = new Date()

        for (const key in data) {
          console.log('reserved at date:', data[key].reservedAtDate)
          const reservedAtDateStringAsDate = new Date(data[key].reservedAtDate)
          const reservationIsToday = todaysDate.getDate() === reservedAtDateStringAsDate.getDate() &&
          todaysDate.getMonth() === reservedAtDateStringAsDate.getMonth() &&
          todaysDate.getFullYear() === reservedAtDateStringAsDate.getFullYear()
          if (!data[key].isCancelled && reservationIsToday) {
            console.log('adding active reservation for punter - fetchReservationsForPunter key: ', key)
            data[key].key = key
            console.log('adding active reservation for punter - fetchReservationsForPunter data[key]: ', data[key])
            resultArray.push(data[key])
          } else if (!data[key].isCancelled) {
            console.log('adding previous reservation for punter - fetchReservationsForPunter key: ', key)
            data[key].key = key
            console.log('adding previous reservation for punter - fetchReservationsForPunter data[key]: ', data[key])
            previousReservationsForPunterArray.push(data[key])
          }
        }
        if (resultArray.length > 0) {
          commit('setCurrentReservationForPunter', resultArray[0])
        } else {
          commit('resetCurrentReservationForPunter')
        }
        if (previousReservationsForPunterArray.length > 0) {
          commit('setPreviousReservationsForPunter', previousReservationsForPunterArray)
        }
      }, error => {
        console.log(error)
      })
  },
  setActiveReservationForPub ({ commit }, payload) {
    console.log('calling setActiveReservationForPub action in index.js')
    commit('setStateActiveReservationForPub', payload)
  },
  cancelOtherReservationForPunterAndReserveNew ({ rootState, dispatch }, { userId, tableToIgnoreId, patronDetails }) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('cancelling reservations using cancelOtherReservationForPunterAndReserveNew for user: ', userId)
    console.log(loadingController)
    return loadingController
      .create({
        message: 'Reserving...'
      })
      .then(loading => {
        loading.present()
        globalAxios.get('reservations.json' + '?auth=' + rootState.userModule.idToken +
          '&orderBy="reservedBy"&equalTo="' + userId + '"')
          .then(response => {
            console.log('fetchReservationForPunter response: ', response)
            const data = response.data
            const resultArray = []
            const todaysDate = new Date()
            for (const key in data) {
              const reservedAtDateStringAsDate = new Date(data[key].reservedAtDate)
              const reservationIsToday = todaysDate.getDate() === reservedAtDateStringAsDate.getDate() &&
              todaysDate.getMonth() === reservedAtDateStringAsDate.getMonth() &&
              todaysDate.getFullYear() === reservedAtDateStringAsDate.getFullYear()
              if (!data[key].isCancelled === true && reservationIsToday && data[key].tableId !== tableToIgnoreId) {
                console.log('fetchReservationForPunter key: ', key)
                data[key].key = key
                console.log('fetchReservationForPunter data[key]: ', data[key])
                resultArray.push(data[key])
              } else {
                console.log('not cancelling reservation - data[key]:', data[key])
                console.log('not cancelling reservation - tableToIgnoreId:', tableToIgnoreId)
              }
            }

            console.log('resFromArray: ', resultArray)
            resultArray.forEach((res) => {
              console.log('res: ', res)
              console.log('cancelling reservation in DB for table: ', res.tableId)
              dispatch('cancelReservation', res)
            })
            dispatch('createReservation', patronDetails)
          })
        setTimeout(function () {
          loading.dismiss()
        }, 1500)
      })
  },
  cancelReservationForCurrentlySelectedTable ({ commit, rootState }, reservationKey) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('cancelling reservation in DB with res key id: ', reservationKey)

    const resFromArray = state.allReservationsForPub.filter(res => res.key === reservationKey)[0]
    console.log('resFromArray:', resFromArray)
    const reservation = {
      table: {
        seats: resFromArray.table.seats,
        tableId: resFromArray.table.tableId,
        tableNum: resFromArray.table.tableNum,
        floor: resFromArray.table.floor,
        pubFloorArea: resFromArray.table.pubFloorArea
      },
      isCancelled: true,
      cancelledAtDate: new Date(),
      key: null,
      pub: {
        pubId: resFromArray.pub.pubId,
        pubName: resFromArray.pub.pubName
      },
      reservedAtDate: resFromArray.reservedAtDate,
      reservedBy: resFromArray.reservedBy,
      reservedByOwner: resFromArray.reservedByOwner,
      patronDetails: null
    }

    // update record but don't delete it
    globalAxios.patch('reservations/' + reservationKey + '.json' + '?auth=' + rootState.userModule.idToken, reservation)
      .then(res => {
        console.log(res)
        console.log('reservation successfully cancelled in DB: ', res.data)
        console.log('about to reset reservation...')
        commit('resetCurrentReservation')
        commit('removeReservationFromCollection', reservationKey)
        commit('resetCurrentReservationForPunter')
      })
      .catch(error => console.log(error))
  },
  cancelReservation ({ commit, rootState }, reservationData) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('cancelling reservation in DB for table: ', reservationData)

    const reservation = {
      table: {
        seats: reservationData.table.seats,
        tableId: reservationData.table.tableId,
        tableNum: reservationData.table.tableNum,
        floor: reservationData.table.floor,
        pubFloorArea: reservationData.table.pubFloorArea
      },
      isCancelled: true,
      cancelledAtDate: new Date(),
      key: null,
      pub: {
        pubId: reservationData.pub.pubId,
        pubName: reservationData.pub.pubName
      },
      reservedAtDate: reservationData.reservedAtDate,
      reservedBy: reservationData.reservedBy,
      reservedByOwner: reservationData.reservedByOwner,
      patronDetails: null
    }

    const resKey = reservationData.key

    // update record but don't delete it
    globalAxios.patch('reservations/' + resKey + '.json' + '?auth=' + rootState.userModule.idToken, reservation)
      .then(res => {
        console.log(res)
        console.log('reservation successfully cancelled in DB: ', res.data)
        console.log('about to reset reservation...')
        commit('resetCurrentReservation')
        commit('removeReservationFromCollection', resKey)
      })
      .catch(error => console.log(error))
  },
  createReservation ({ commit, rootState }, patronDetails) {
    if (!rootState.userModule.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    let arrivalLimitTime = null
    if (rootState.pubModule.pub.timeToArrivalLimitOn) {
      console.log('setting time to arrival limit on')
      arrivalLimitTime = new Date()
      arrivalLimitTime.setMinutes(arrivalLimitTime.getMinutes() + rootState.pubModule.pub.timeToArrivalLimitInMinutes)
    }
    const reservation = {
      table: {
        tableId: rootState.pubModule.pubTable.key,
        tableNum: rootState.pubModule.pubTable.tableNum,
        seats: rootState.pubModule.pubTable.seats,
        floor: rootState.pubModule.pubTable.floor,
        pubFloorArea: rootState.pubModule.pubTable.pubFloorArea
      },
      pub: {
        pubId: rootState.pubModule.pubTable.pubId,
        pubName: rootState.pubModule.pub.pubName
      },
      reservedBy: rootState.userModule.userId,
      reservedByOwner: rootState.pubModule.pub.ownerId === rootState.userModule.userId,
      reservedAtDate: new Date(),
      timeToArrivalLimit: arrivalLimitTime
    }

    const reservationsPatronDetails = {
      patronName: patronDetails.patronName,
      patronPhone: patronDetails.patronPhone
    }

    try {
      console.log('adding new reservation to DB: ', reservation)
      globalAxios.post('reservations.json' + '?auth=' + rootState.userModule.idToken, reservation)
        .then(res => {
          console.log('new reservatioon data:', res)
          reservation.key = res.data.name
          commit('addReservationToCollection', reservation)

          // globalAxios.get('usersDetails.json' + '?auth=' + rootState.userModule.idToken +
          // '&orderBy="$key"&equalTo="' + reservation.reservedBy + '"')
          //   .then(response => {
          //     console.log(response)
          //     const userData = response.data
          //     const usesDetailsResultArray = []
          //     for (const dataKey in userData) {
          //       console.log('fetch user details key inside: ', dataKey)
          //       console.log('user details userData[key]: ', userData[dataKey])
          //       usesDetailsResultArray.push(userData[dataKey])
          //     }
          //     reservation.userDetails = usesDetailsResultArray[0]

          //     // commit('setCurrentReservation', reservation)
          //     commit('addReservationToCollection', reservation)
          //     console.log('reservation successfully saved to DB: ', res.data)
          //   })
        })
        .then(() => {
          // if (reservation.reservedByOwner) {
          globalAxios.put('reservationsPatronDetails/' + reservation.key + '.json' + '?auth=' + rootState.userModule.idToken, reservationsPatronDetails)
            .then(res => {
              // update reservation with guest user details for reservation
              reservation.patronDetails = { patronName: res.data.patronName, patronPhone: res.data.patronPhone }
              commit('updateReservationInCollection', reservation)
            })
          // }
        })
        .catch(error => console.log(error))
    } catch (ex) {
      console.log('error:', ex)
      alert('Could not reserve Table - Refresh page and try again.')
    }
  }
}

const getters = {
  activeReservationforPub (state) {
    console.log('calling current reservation getter')
    return state.reservation
  },
  activeReservationForPunter (state) {
    console.log('calling activeReservationForPunter getter')
    return state.activeReservationForPunter
  },
  previousReservationsForPunter (state) {
    console.log('calling previousReservationsForPunter getter')
    return state.previousReservationsForPunter
  },
  allReservationsForPub (state) {
    console.log('calling allReservationsForPub getter')
    return state.allReservationsForPub
  },
  allTodaysReservationsForPub (state) {
    console.log('calling allTodaysReservationsForPub getter')
    const todaysDate = new Date()
    return state.allReservationsForPub.filter(p => {
      const reservedAtDateStringAsDate = new Date(p.reservedAtDate)
      const reservationIsToday = todaysDate.getDate() === reservedAtDateStringAsDate.getDate() &&
      todaysDate.getMonth() === reservedAtDateStringAsDate.getMonth() &&
      todaysDate.getFullYear() === reservedAtDateStringAsDate.getFullYear()
      return reservationIsToday
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
