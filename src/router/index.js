import Vue from 'vue'
import CreateNewPub from '../views/CreateNewPub.vue'
import Privacy from '../views/Privacy.vue'
import Home from '../views/Home.vue'
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

const autoLogin = store.dispatch('userModule/tryAutoSignin')

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'home'
  },
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
        name: 'search-for-pub'
        // beforeEnter (to, from, next) {
        //   var token = store.state.userModule.idToken
        //   if (token) {
        //     console.log('token found, going to next:', next)
        //     next()
        //   } else {
        //     console.log('token not found, going to /home:')
        //     next('/home')
        //   }
        // }
      },
      {
        path: ':id/pub-details',
        components: {
          searchRoute: () => import('@/views/PubDetails.vue')
        },
        name: 'pub-details'
        // beforeEnter (to, from, next) {
        //   var token = store.state.userModule.idToken
        //   if (token) {
        //     next()
        //   } else {
        //     next('/home')
        //   }
        // }
      },
      {
        path: ':id/reserve-table',
        components: {
          searchRoute: () => import('@/views/ReserveTable.vue')
        },
        name: 'reserve-table'
        // beforeEnter (to, from, next) {
        //   var token = store.state.userModule.idToken
        //   if (token) {
        //     next()
        //   } else {
        //     next('/home')
        //   }
        // }
      },
      {
        path: ':id/edit-pub',
        components: {
          searchRoute: () => import('@/views/EditPub.vue')
        },
        name: 'edit-pub',
        beforeEnter (to, from, next) {
          console.log('navigating to edit-pub page.')
          var token = store.state.userModule.idToken
          var pub = store.state.pubModule.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/home')
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
          var token = store.state.userModule.idToken
          var pub = store.state.pubModule.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/home')
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
          var token = store.state.userModule.idToken
          var pub = store.state.pubModule.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/home')
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
        path: '/:id/add-pub-photo',
        components: {
          searchRoute: () => import('@/views/AddPubPhoto.vue')
        },
        name: 'add-pub-photo',
        beforeEnter (to, from, next) {
          console.log('navigating to add-pub-photo page.')
          var token = store.state.userModule.idToken
          var pub = store.state.pubModule.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/home')
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
          var token = store.state.userModule.idToken
          var pub = store.state.pubModule.pub
          if (!token) {
            console.log('token not found - re-directing to sign in')
            next('/home')
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
          console.log('calling beforeEnter for profile view')
          var token = store.state.userModule.idToken
          if (token) {
            console.log('next', next)
            next()
          } else {
            next('/home')
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
          var token = store.state.userModule.idToken
          if (token) {
            next()
          } else {
            next('/home')
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
          var token = store.state.userModule.idToken
          if (token) {
            next()
          } else {
            next('/home')
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
      var token = store.state.userModule.idToken
      if (token) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/create-new-pub',
    component: CreateNewPub,
    name: 'create-new-pub',
    beforeEnter (to, from, next) {
      var token = store.state.userModule.idToken
      if (token) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/create-user-roles',
    component: CreateUserRoles,
    name: 'create-user-roles',
    beforeEnter (to, from, next) {
      var token = store.state.userModule.idToken
      if (token) {
        next()
      } else {
        next('/home')
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
      var token = store.state.userModule.idToken
      if (token) {
        next('tabs/search-for-pub')
      } else {
        next()
      }
    }
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    beforeEnter (to, from, next) {
      var token = store.state.userModule.idToken
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
      var token = store.state.userModule.idToken
      if (token) {
        next('tabs/search-for-pub')
      } else {
        next()
      }
    }
  },
  { path: '/', redirect: 'home' },
  { path: '*', redirect: 'home' }

  // { path: '' }
]

const router = new IonicVueRouter({
  // mode: 'history', // for not having the # in the URL
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  autoLogin.then(next)
})

export default router
