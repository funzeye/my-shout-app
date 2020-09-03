import router from '../../router'
import axios from '../../axios-auth'
import globalAxios from 'axios'

const getDefaultState = () => {
  return {
    idToken: null,
    userId: null,
    refreshToken: null,
    isPublican: false,
    isPunter: false,
    user: {
      email: '',
      firstName: '',
      surname: '',
      userRoles: null,
      phone: ''
    },
    userRoles: []
  }
}
const state = getDefaultState()

const mutations = {
  resetUserModuleState (state) {
    Object.assign(state, getDefaultState())
  },
  authUser (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
    state.refreshToken = userData.refreshToken
  },
  clearAuthData (state) {
    state.idToken = null
    state.userId = null
    state.refreshToken = null
  },
  setUserType (state, userRoles) {
    state.isPublican = userRoles.isPublican
    state.isPunter = userRoles.isPunter
  },
  storeUserDetails (state, userData) {
    state.user.email = userData.email
    state.user.phone = userData.phone
    state.user.firstName = userData.firstName
    state.user.surname = userData.surname
    state.user.userRoles = userData.userRoles
  },
  storeUserDetailsEmail (state, email) {
    state.user.email = email
  },
  storeUserDetailsUserRole (state, userRole) {
    state.user.userRoles = userRole
  },
  storeUserRoles (state, userRoles) {
    state.userRoles = userRoles
  },
  addNewUserRoleToCollection (state, userRole) {
    state.userRoles.push(userRole)
  }
}

const actions = {
  setLogoutTimer ({ commit, dispatch, state }, expirationTime) {
    var timer = setTimeout(() => {
      console.log('timeout elapsed - refreshing token...')
      console.log('timeout elapsed - token is:', state.idToken)
      console.log('timeout elapsed - refresh token is:', state.refreshToken)
      axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
        { grant_type: 'refresh_token', refresh_token: state.refreshToken })
        .then(res => {
          console.log('refreshing token:', res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000)
          console.log('setting localStorage variables')
          localStorage.setItem('token', res.data.id_token)
          localStorage.setItem('refreshToken', res.data.refresh_token)
          localStorage.setItem('expirationDate', expirationDate.getTime())
          commit('authUser', {
            token: res.data.id_token,
            userId: res.data.user_id,
            refreshToken: res.data.refresh_token
          })
          clearTimeout(timer)
          dispatch('setLogoutTimer', res.data.expires_in)
        })
        .catch(error => console.log(error))
    }, expirationTime * 1000)
  },
  signup ({ commit, dispatch }, authData) {
    axios.post(':signUp?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
      { email: authData.email, password: authData.password, returnSecureToken: true })
      .then(res => {
        console.log(res)
        commit('authUser', {
          token: res.data.idToken,
          refreshToken: res.data.refreshToken,
          userId: res.data.localId
        })
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        console.log('seeting localStorage variables')
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('expirationDate', expirationDate.getTime())

        console.log('storing user details in DB')
        dispatch('storeUserDetails', {
          email: authData.email,
          firstName: authData.firstName,
          surname: authData.surname,
          phone: authData.phone
        }).then(() => {
          console.log('add user role to user details in DB')
          dispatch('addRoleToUsersDetails', {
            userRole: authData.userRole,
            userId: res.data.localId
          }).then(() => {
            console.log('add user id to user roles in DB')
            dispatch('addUserToUserRolesMembers', {
              userRole: authData.userRole,
              userId: res.data.localId
            })
          })
        })

        console.log('calling setLogoutTimer action')
        dispatch('setLogoutTimer', res.data.expiresIn)

        console.log('calling router for #/tabs/search-for-pub')
        router.replace({ name: 'search-for-pub' })
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
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('expirationDate', expirationDate.getTime())
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId,
          refreshToken: res.data.refreshToken
        })
        dispatch('fetchUserDetails')
        dispatch('setLogoutTimer', res.data.expiresIn)

        router.replace('/')
      })
      .catch(error => console.log(error))
  },
  changeEmail ({ commit, state, dispatch }, newData) {
    console.log('id token:', state.idToken)
    console.log('email:', newData.newEmail)
    axios.post(':update?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
      { idToken: state.idToken, email: newData.newEmail, returnSecureToken: true })
      .then(res => {
        console.log('response:', res)
        console.log('res.data.email:', res.data.email)
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('expirationDate', expirationDate.getTime())
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId,
          refreshToken: res.data.refreshToken
        })
        dispatch('storeUserDetailsEmail', { email: newData.newEmail })
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => {
        console.log(error)
      })
  },
  sendPasswordEmailReset ({ commit, state, dispatch }, emailToSendTo) {
    axios.post(':sendOobCode?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
      { requestType: 'PASSWORD_RESET', email: emailToSendTo })
      .then(res => {
        console.log('response:', res)
        dispatch('logout')
      })
      .catch(error => {
        console.log(error)
      })
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
    const refreshToken = localStorage.getItem('refreshToken')

    dispatch('setLogoutTimer', (expirationDate - now) / 1000)
    commit('authUser', {
      token: token,
      userId: userId,
      refreshToken: refreshToken
    })
  },
  logout ({ commit }) {
    router.replace('/')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('isPublican')
    localStorage.removeItem('isPunter')
    commit('resetUserModuleState')
    commit('reservationModule/resetReservationModuleState', null, { root: true })
    commit('pubModule/resetPubModuleState', null, { root: true })
  },
  fetchUserDetails ({ commit, state }) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('fecthing user details data from the DB')
    console.log('for user details with user id:', state.userId)
    globalAxios.get('usersDetails.json' + '?auth=' + state.idToken + '&orderBy="$key"&equalTo="' + state.userId + '"')
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
          const foundUser = resultArray[0]
          commit('storeUserDetails', foundUser)
          if (foundUser.userRoles.punter === true) {
            localStorage.setItem('isPunter', true)
          } else {
            localStorage.setItem('isPunter', false)
          }

          if (foundUser.userRoles.publican === true) {
            localStorage.setItem('isPublican', true)
          } else {
            localStorage.setItem('isPublican', false)
          }
          commit('setUserType', { isPublican: foundUser.userRoles.publican === true, isPunter: foundUser.userRoles.punter === true })
        }
      }, error => {
        console.log(error)
      })
  },
  fetchUserRoles ({ commit, state }) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('fecthing User Roles from the DB and updating List')
    globalAxios.get('userRoles.json' + '?auth=' + state.idToken)
      .then(response => {
        console.log(response)
        const data = response.data

        const resultArray = []
        for (const key in data) {
          console.log('data:', data)
          console.log('data[key]:', data[key])
          console.log('key:', key)
          resultArray.push(data[key])
        }
        commit('storeUserRoles', resultArray)
      }, error => {
        console.log(error)
      })
  },
  storeUserDetails ({ commit, state }, userData) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    globalAxios.put('usersDetails/' + state.userId + '.json' + '?auth=' + state.idToken, userData)
      .then(res => {
        console.log(res)
        commit('storeUserDetails', {
          email: userData.email,
          firstName: userData.firstName,
          surname: userData.surname,
          phone: userData.phone
        })
      })
      .catch(error => console.log(error))
  },
  storeUserDetailsEmail ({ commit, state }, userData) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    globalAxios.patch('usersDetails/' + state.userId + '.json' + '?auth=' + state.idToken, userData)
      .then(res => {
        console.log(res)
        commit('storeUserDetailsEmail', userData.email)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  addRoleToUsersDetails ({ commit, state }, userData) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('adding role to userDetails', userData)
    const userRole = userData.userRole
    globalAxios.patch('usersDetails/' + userData.userId + '/userRoles.json' + '?auth=' + state.idToken, { [userRole]: true })
      .then(res => {
        console.log('addRoleToUsersDetails response:', res)
        commit('storeUserDetailsUserRole', res.data)
      })
      .catch(error => console.log(error))
  },
  addUserToUserRolesMembers ({ commit, state }, userData) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('addUserToUserRolesMembers data:', userData)
    const userRole = userData.userRole
    globalAxios.patch('userRoles/' + userRole + '/members.json' + '?auth=' + state.idToken, { [userData.userId]: true })
      .then(res => {
        console.log('addUserToUserRolesMembers response:', userData)
      })
      .catch(error => console.log(error))
  },
  storeUserRole ({ commit, state }, userRole) {
    if (!state.idToken) {
      console.log('No Id Token - Exiting')
      return
    }
    console.log('adding new user role area to DB: ', userRole)
    globalAxios.put('userRoles/' + userRole.roleId + '.json?auth=' + state.idToken, { roleName: userRole.roleName })
      .then(res => {
        console.log(res)
        commit('addNewUserRoleToCollection', userRole)
        console.log('user role successfully saved to DB: ', res.data)
      })
      .catch(error => console.log(error))
  }
}

const getters = {
  user (state) {
    console.log('calling user getter')
    return state.user
  },
  userId (state) {
    console.log('calling user id getter')
    return state.userId
  },
  isAuthenticated (state) {
    return state.idToken !== null
  },
  isPublican (state) {
    console.log('calling isPublican getter')
    return state.isPublican
  },
  isPunter (state) {
    console.log('calling isPunter getter')
    return state.isPunter
  },
  userRoles (state) {
    console.log('calling user roles getter')
    console.log(state)
    return state.userRoles
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
