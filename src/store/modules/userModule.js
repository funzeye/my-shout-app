import router from '../../router'
import firebase from 'firebase/app'

const getDefaultState = () => {
  return {
    user: null,
    isPublican: false,
    isPunter: false,
    userDetails: {
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
  setUser (state, userData) {
    state.user = userData
  },
  clearUser (state) {
    state.user = null
  },
  setUserType (state, userRoles) {
    state.isPublican = userRoles.isPublican
    state.isPunter = userRoles.isPunter
  },
  storeUserDetails (state, userData) {
    state.userDetails.email = userData.email
    state.userDetails.phone = userData.phone
    state.userDetails.firstName = userData.firstName
    state.userDetails.surname = userData.surname
    state.userDetails.userRoles = userData.userRoles
  },
  storeUserDetailsEmail (state, email) {
    state.userDetails.email = email
  },
  storeUserDetailsUserRole (state, userRole) {
    state.userDetails.userRoles = userRole
  },
  storeUserRoles (state, userRoles) {
    state.userRoles = userRoles
  },
  addNewUserRoleToCollection (state, userRole) {
    state.userRoles.push(userRole)
  }
}

const actions = {
  checkAuth ({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async (_user) => {
        if (_user) {
          commit('setUser', _user)
        } else {
          commit('setUser', null)
        }
        console.log('current user in checkAuth action:', _user)
        resolve(true)
      })
    })
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  // setLogoutTimer ({ commit, dispatch, state }, expirationTime) {
  //   var timer = setTimeout(() => {
  //     console.log('timeout elapsed - refreshing token...')
  //     console.log('timeout elapsed - token is:', state.idToken)
  //     console.log('timeout elapsed - refresh token is:', state.refreshToken)
  //     axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
  //       { grant_type: 'refresh_token', refresh_token: state.refreshToken })
  //       .then(res => {
  //         console.log('refreshing token:', res)
  //         const now = new Date()
  //         const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000)
  //         console.log('setting localStorage variables')
  //         localStorage.setItem('token', res.data.id_token)
  //         localStorage.setItem('refreshToken', res.data.refresh_token)
  //         localStorage.setItem('expirationDate', expirationDate.getTime())
  //         commit('authUser', {
  //           token: res.data.id_token,
  //           userId: res.data.user_id,
  //           refreshToken: res.data.refresh_token
  //         })
  //         clearTimeout(timer)
  //         dispatch('setLogoutTimer', res.data.expires_in)
  //       })
  //       .catch(error => console.log(error))
  //   }, expirationTime * 1000)
  // },
  signup ({ dispatch }, authData) {
    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
      .then(response => {
        console.log('response:', response)
        console.log('storing user details in DB')
        dispatch('storeUserDetails', {
          email: authData.email,
          firstName: authData.firstName,
          surname: authData.surname,
          phone: authData.phone
        }).then(() => {
          console.log('add user role to user details in DB')
          dispatch('addRoleToUsersDetails', {
            userRole: authData.userRole
          }).then(() => {
            console.log('add user id to user roles in DB')
            dispatch('addUserToUserRolesMembers', {
              userRole: authData.userRole
            })
          })
        })

        console.log('calling router for #/tabs/search-for-pub')
        router.replace({ name: 'search-for-pub' })
      })
      .catch(function (error) {
        console.log(error)
        // Handle Errors here.
        // const errorCode = error.code
        // const errorMessage = error.message
        // ...
      })

    // axios.post(':signUp?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
    //   { email: authData.email, password: authData.password, returnSecureToken: true })
    //   .then(res => {
    //     console.log(res)
    //     commit('authUser', {
    //       token: res.data.idToken,
    //       refreshToken: res.data.refreshToken,
    //       userId: res.data.localId
    //     })

    //     console.log('storing user details in DB')
    //     dispatch('storeUserDetails', {
    //       email: authData.email,
    //       firstName: authData.firstName,
    //       surname: authData.surname,
    //       phone: authData.phone
    //     }).then(() => {
    //       console.log('add user role to user details in DB')
    //       dispatch('addRoleToUsersDetails', {
    //         userRole: authData.userRole,
    //         userId: res.data.localId
    //       }).then(() => {
    //         console.log('add user id to user roles in DB')
    //         dispatch('addUserToUserRolesMembers', {
    //           userRole: authData.userRole,
    //           userId: res.data.localId
    //         })
    //       })
    //     })

    //     // console.log('calling setLogoutTimer action')
    //     // dispatch('setLogoutTimer', res.data.expiresIn)

    //     console.log('calling router for #/tabs/search-for-pub')
    //     router.replace({ name: 'search-for-pub' })
    //   })
    //   .catch(error => console.log(error))
  },
  // async signin ({ commit, dispatch }, { authData, noRedirect }) {
  //   await axios.post(':signInWithPassword?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
  //     { email: authData.email, password: authData.password, returnSecureToken: true })
  //     .then(res => {
  //       console.log(res)
  //       const now = new Date()
  //       const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
  //       localStorage.setItem('token', res.data.idToken)
  //       localStorage.setItem('userId', res.data.localId)
  //       localStorage.setItem('refreshToken', res.data.refreshToken)
  //       localStorage.setItem('expirationDate', expirationDate.getTime())
  //       commit('authUser', {
  //         token: res.data.idToken,
  //         userId: res.data.localId,
  //         refreshToken: res.data.refreshToken
  //       })
  //       dispatch('fetchUserDetails')
  //       dispatch('setLogoutTimer', res.data.expiresIn)
  //       console.log('noRedirect', noRedirect)
  //       if (!noRedirect) router.replace({ name: 'search-for-pub' })
  //     })
  // },
  async signin ({ commit, dispatch }, { authData, noRedirect }) {
    await firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then(function (response) {
        console.log('response:', response)
        console.log('noRedirect:', noRedirect)
        if (!noRedirect) router.replace({ name: 'search-for-pub' })
      })
  },
  async changeEmail ({ commit, state, dispatch }, newData) {
    const user = firebase.auth().currentUser

    const credential = firebase.auth.EmailAuthProvider.credential(
      state.user.email,
      newData.userProvidedPassword
    )

    await user.reauthenticateWithCredential(credential).then(function () {
      user.updateEmail(newData.newEmail).then(function () {
        // Update successful.
        console.log('email updated successfully')
        dispatch('storeUserDetailsEmail', { email: newData.newEmail })
      })
    })

    // console.log('id token:', state.idToken)
    // console.log('email:', newData.newEmail)
    // axios.post(':update?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
    //   { idToken: token, email: newData.newEmail, returnSecureToken: true })
    //   .then(res => {
    //     console.log('response:', res)
    //     console.log('res.data.email:', res.data.email)
    //     const now = new Date()
    //     const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
    //     localStorage.setItem('token', res.data.idToken)
    //     localStorage.setItem('userId', res.data.localId)
    //     localStorage.setItem('refreshToken', res.data.refreshToken)
    //     localStorage.setItem('expirationDate', expirationDate.getTime())
    //     commit('authUser', {
    //       token: res.data.idToken,
    //       userId: res.data.localId,
    //       refreshToken: res.data.refreshToken
    //     })
    //     dispatch('storeUserDetailsEmail', { email: newData.newEmail })
    //     dispatch('setLogoutTimer', res.data.expiresIn)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  sendPasswordEmailReset ({ dispatch }, emailToSendTo) {
    // axios.post(':sendOobCode?key=AIzaSyB8-xAjyYMTR0Jt1-H-ayS9FDINW4JdAhQ',
    //  { requestType: 'PASSWORD_RESET', email: emailToSendTo })
    firebase.auth().sendPasswordResetEmail(emailToSendTo)
      .then(res => {
        console.log('response:', res)
        dispatch('logout')
      })
      .catch(error => {
        console.log(error)
      })
  },
  // tryAutoSignin ({ commit, state, dispatch }) {
  //   console.log('trying auto sign in')
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     return
  //   }
  //   const expirationDate = localStorage.getItem('expirationDate')
  //   const now = new Date().getTime()
  //   if (now >= expirationDate) {
  //     return // token has expired
  //   }

  //   const userId = localStorage.getItem('userId')
  //   const refreshToken = localStorage.getItem('refreshToken')
  //   const isPunter = localStorage.getItem('isPunter')
  //   const isPublican = localStorage.getItem('isPublican')

  //   dispatch('setLogoutTimer', (expirationDate - now) / 1000)
  //   commit('authUser', {
  //     token: token,
  //     userId: userId,
  //     refreshToken: refreshToken
  //   })
  //   commit('setUserType', {
  //     isPublican: isPublican,
  //     isPunter: isPunter
  //   })
  // },
  logout ({ commit }) {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.replace('/')
        commit('resetUserModuleState')
        commit('reservationModule/resetReservationModuleState', null, { root: true })
        commit('pubModule/resetPubModuleState', null, { root: true })
        localStorage.removeItem('isPublican')
        localStorage.removeItem('isPunter')
      })
  },
  fetchUserDetails ({ commit, state }) {
    console.log('state.user', state.user)
    if (!state.user) {
      console.log('No User - Exiting')
      return
    }
    // const user = firebase.auth().currentUser
    console.log('fecthing user details data from the DB')
    console.log('for user details with user id:', state.user.uid)
    firebase.database().ref('/usersDetails/' + state.user.uid)
      .on('value', function (snapshot) {
        console.log('fetchUserDetails response: ', snapshot)
        const data = snapshot.val()

        if (data) {
          const foundUser = data
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
    console.log('fecthing User Roles from the DB and updating List')
    // globalAxios.get('userRoles.json' + '?auth=' + state.idToken)
    firebase.database().ref('userRoles')
      .on('value', function (snapshot) {
        console.log('fetchUserDetails response: ', snapshot)
        const data = snapshot.val()
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
    var user = firebase.auth().currentUser
    if (!user) {
      console.log('No user Id - Exiting')
      return
    }
    // globalAxios.put('usersDetails/' + state.user.uid + '.json' + '?auth=' + state.idToken, userData)
    firebase.database().ref('usersDetails/' + user.uid).set(userData)
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
    if (!state.user) {
      console.log('No user - Exiting')
      return
    }
    // globalAxios.patch('usersDetails/' + state.userId + '.json' + '?auth=' + state.idToken, userData)
    firebase.database().ref('usersDetails/' + state.user.uid).update({ email: userData.email })
      .then(() => {
        commit('storeUserDetailsEmail', userData.email)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  addRoleToUsersDetails ({ commit, state }, userData) {
    var user = firebase.auth().currentUser
    if (!user) {
      console.log('No user Id - Exiting')
      return
    }
    console.log('adding role to userDetails', userData)
    const userRole = userData.userRole
    // globalAxios.patch('usersDetails/' + userData.userId + '/userRoles.json' + '?auth=' + state.idToken, { [userRole]: true })
    firebase.database().ref('usersDetails/' + user.uid + '/userRoles').set({ [userRole]: true })
      .then(() => {
        // console.log('addRoleToUsersDetails response:', res)
        commit('storeUserDetailsUserRole', [userRole])
      })
      .catch(error => console.log(error))
  },
  addUserToUserRolesMembers ({ commit, state }, userData) {
    var user = firebase.auth().currentUser
    if (!user) {
      console.log('No user - Exiting')
      return
    }
    var userId = user.uid
    console.log('addUserToUserRolesMembers data:', userData)
    const userRole = userData.userRole
    // globalAxios.patch('userRoles/' + userRole + '/members.json' + '?auth=' + state.idToken, { [userId]: true })
    firebase.database().ref('userRoles/' + userRole + '/members').update({ [userId]: true })
      .then(() => {
        console.log('addUserToUserRolesMembers response:', userData)
      })
      .catch(error => console.log(error))
  },
  storeUserRole ({ commit }, userRole) {
    console.log('adding new user role area to DB: ', userRole)
    firebase.database().ref('userRoles/' + userRole.roleId).set({ roleName: userRole.roleName })
      .then(() => {
        commit('addNewUserRoleToCollection', userRole)
        console.log('user role successfully saved to DB: ', userRole.roleName)
      })
      .catch(error => console.log(error))
  }
}

const getters = {
  userDetails (state) {
    console.log('calling user getter')
    return state.userDetails
  },
  userId (state) {
    console.log('calling user id getter')
    if (state.user) {
      return state.user.uid
    }
  },
  userPhotoUrl (state) {
    console.log('calling user photo url getter for user:', state.user)
    if (state.user) {
      return state.user.photoURL
    }
  },
  isAuthenticated (state) {
    return state.user !== null
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
