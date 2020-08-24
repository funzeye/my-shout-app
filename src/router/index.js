import Vue from 'vue'
import CreateNewPub from '../views/CreateNewPub.vue'
import Privacy from '../views/Privacy.vue'
import CreateUserRoles from '../views/admin/CreateUserRoles.vue'
import CreateNewPubFloorArea from '../views/admin/CreateNewPubFloorArea.vue'
import TabRoot from '../components/TabRoot.vue'
import SignUpPage from '../components/auth/SignUp.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'
import SignInPage from '../components/auth/SignIn.vue'

import store from '../store'

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import { IonicVueRouter } from '@ionic/vue'
Vue.use(IonicVueRouter)

const autoLogin = store.dispatch('tryAutoSignin')

const routes = [
  {
    path: '/tabs',
    component: TabRoot,
    children: [
      {
        path: '/',
        redirect: '/tabs/search-for-pub'
      },
      {
        path: 'search-for-pub',
        components: {
          searchRoute: () => import('@/views/SearchForPub.vue')
        },
        name: 'search-for-pub',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        }// ,
        // children: [
        //
        // ]
      },
      {
        path: ':id/pub-details',
        components: {
          searchRoute: () => import('@/views/PubDetails.vue')
        },
        name: 'pub-details',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        }
      },
      {
        path: ':id/reserve-table',
        components: {
          searchRoute: () => import('@/views/ReserveTable.vue')
        },
        name: 'reserve-table',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        }
      },
      {
        path: ':id/edit-pub',
        components: {
          searchRoute: () => import('@/views/EditPub.vue')
        },
        name: 'edit-pub',
        beforeEnter (to, from, next) {
          console.log('navigating to edit-pub page.')
          var token = store.state.idToken
          var pub = store.state.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/signin')
          } else if (!pub.pubName) {
            console.log('pub name not found - re-directing to home page')
            next('/')
          } else {
            console.log('pub name found - continuing to pub tables page')
            next()
          }
        }
      },
      {
        path: '/:id/edit-pub-tables',
        components: {
          searchRoute: () => import('@/views/EditPubTables.vue')
        },
        name: 'edit-pub-tables',
        beforeEnter (to, from, next) {
          console.log('navigating to edit-pub-tables page.')
          var token = store.state.idToken
          var pub = store.state.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/signin')
          } else if (!pub.pubName) {
            console.log('pub name not found - re-directing to home page')
            next('/')
          } else {
            console.log('pub name found - continuing to pub tables page')
            next()
          }
        }
      },
      {
        path: '/:id/edit-pub-details',
        components: {
          searchRoute: () => import('@/views/EditPubDetails.vue')
        },
        name: 'edit-pub-details',
        beforeEnter (to, from, next) {
          console.log('navigating to edit-pub-details page.')
          var token = store.state.idToken
          var pub = store.state.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/signin')
          } else if (!pub.pubName) {
            console.log('pub name not found - re-directing to home page')
            next('/')
          } else {
            console.log('pub name found - continuing to pub tables page')
            next()
          }
        }
      },
      {
        path: '/:id/edit-table-details',
        components: {
          searchRoute: () => import('@/views/EditTableDetails.vue')
        },
        name: 'edit-table-details',
        beforeEnter (to, from, next) {
          console.log('navigating to edit-table-details page.')
          var token = store.state.idToken
          var pub = store.state.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/signin')
          } else if (!pub.pubName) {
            console.log('pub name not found - re-directing to home page')
            next('/')
          } else {
            console.log('pub name found - continuing to edit table page')
            next()
          }
        }
      },
      {
        path: 'profile',
        components: {
          profileRoute: () => import('@/views/Profile.vue')
        },
        name: 'profile',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        }
      },
      {
        path: ':userId/change-email',
        components: {
          profileRoute: () => import('@/views/ChangeEmail.vue')
        },
        name: 'change-email',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        }
      },
      {
        path: 'booked-tables',
        components: {
          bookedTablesRoute: () => import('@/views/BookedTables.vue')
        },
        name: 'booked-tables',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        }
      }
    ]
  },
  {
    path: '/create-new-pub-floor-area',
    component: CreateNewPubFloorArea,
    name: 'create-new-pub-floor-area',
    beforeEnter (to, from, next) {
      var token = store.state.idToken
      if (token) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/create-new-pub',
    component: CreateNewPub,
    name: 'create-new-pub',
    beforeEnter (to, from, next) {
      var token = store.state.idToken
      if (token) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/create-user-roles',
    component: CreateUserRoles,
    name: 'create-user-roles',
    beforeEnter (to, from, next) {
      var token = store.state.idToken
      if (token) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/privacy',
    component: Privacy,
    name: 'privacy'
  },
  {
    path: '/signup',
    component: SignUpPage,
    beforeEnter (to, from, next) {
      var token = store.state.idToken
      if (token) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    beforeEnter (to, from, next) {
      var token = store.state.idToken
      if (token) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/signin',
    component: SignInPage,
    beforeEnter (to, from, next) {
      var token = store.state.idToken
      if (token) {
        next('/')
      } else {
        next()
      }
    }
  },
  { path: '/', redirect: 'tabs/search-for-pub' },
  { path: '*', redirect: 'tabs/search-for-pub' }

  // { path: '' }
]

const router = new IonicVueRouter({
  // mode: 'history', // for not having the # in the URL
  routes
})

router.beforeEach((to, from, next) => {
  if (to !== 'privacy') {
    autoLogin.then(next)
  }
})

export default router
