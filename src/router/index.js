import Vue from 'vue'
import CreateNewPub from '../views/CreateNewPub.vue'
import Privacy from '../views/Privacy.vue'
import Home from '../views/Home.vue'
import CreateUserRoles from '../views/admin/CreateUserRoles.vue'
import CreateNewPubFloorArea from '../views/admin/CreateNewPubFloorArea.vue'
import EditPubFloorArea from '../views/admin/EditPubFloorArea.vue'
// import TabRoot from '../components/TabRoot.vue'
import SignUpPage from '../components/auth/SignUp.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'
import SignInPage from '../components/auth/SignIn.vue'

import store from '../store'

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import { IonicVueRouter } from '@ionic/vue'
Vue.use(IonicVueRouter)

// const ensureUserAuthenticated = store.dispatch('userModule/ensureUserAuthenticated')

const routes = [
  {
    path: '/home',
    component: Home,
    name: 'home',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/tabs',
    // component: TabRoot,
    component: () => import('@/components/TabRoot.vue'),
    children: [
      {
        path: '/',
        redirect: '/tabs/search-for-pub',
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'search-for-pub',
        components: {
          searchRoute: () => import('@/views/SearchForPub.vue')
        },
        name: 'search-for-pub',
        meta: {
          requiresAuth: false
        }
      },
      {
        path: ':id/pub-details',
        components: {
          searchRoute: () => import('@/views/PubDetails.vue')
        },
        name: 'pub-details',
        meta: {
          requiresAuth: false
        }
      },
      {
        path: ':id/reserve-table',
        components: {
          searchRoute: () => import('@/views/ReserveTable.vue')
        },
        name: 'reserve-table',
        meta: {
          requiresAuth: false
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
          var pub = store.state.pubModule.pub
          if (!pub.pubName) {
            console.log('pub name not found - re-directing to home page')
            next('/')
          } else {
            console.log('pub name found - continuing to pub tables page')
            next()
          }
        }
      },
      {
        path: '/:id?/edit-pub-tables',
        components: {
          searchRoute: () => import('@/views/EditPubTables.vue')
        },
        name: 'edit-pub-tables',
        beforeEnter (to, from, next) {
          console.log('navigating to edit-pub-tables page.')
          var pub = store.state.pubModule.pub
          if (!pub.pubName) {
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
          var pub = store.state.pubModule.pub
          if (!pub.pubName) {
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
          var pub = store.state.pubModule.pub
          if (!pub.pubName) {
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
          var pub = store.state.pubModule.pub
          if (!pub.pubName) {
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
        name: 'profile'
      },
      {
        path: ':userId/change-email',
        components: {
          profileRoute: () => import('@/views/ChangeEmail.vue')
        },
        name: 'change-email'
      },
      {
        path: ':userId/edit-user-details',
        components: {
          profileRoute: () => import('@/views/EditUserDetails.vue')
        },
        name: 'edit-user-details'
      },
      {
        path: 'booked-tables',
        components: {
          bookedTablesRoute: () => import('@/views/BookedTables.vue')
        },
        name: 'booked-tables'
      }
    ]
  },
  {
    path: '/create-new-pub-floor-area',
    component: CreateNewPubFloorArea,
    name: 'create-new-pub-floor-area',
    beforeEnter (to, from, next) {
      checkIfAdmin(next)
    }
  },
  {
    path: '/:key/edit-pub-floor-area',
    component: EditPubFloorArea,
    name: 'edit-pub-floor-area',
    beforeEnter (to, from, next) {
      checkIfAdmin(next)
    }
  },
  {
    path: '/create-new-pub',
    component: CreateNewPub,
    name: 'create-new-pub',
    beforeEnter (to, from, next) {
      checkIfPublican(next)
    }
  },
  {
    path: '/create-user-roles',
    component: CreateUserRoles,
    name: 'create-user-roles',
    beforeEnter (to, from, next) {
      checkIfAdmin(next)
    }
  },
  {
    path: '/privacy',
    component: Privacy,
    name: 'privacy',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signup',
    component: SignUpPage,
    beforeEnter (to, from, next) {
      var user = store.state.userModule.user
      if (user) {
        next('tabs/search-for-pub')
      } else {
        next()
      }
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    beforeEnter (to, from, next) {
      var user = store.state.userModule.user
      if (user) {
        next('/')
      } else {
        next()
      }
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signin',
    component: SignInPage,
    meta: {
      requiresAuth: false
    },
    beforeEnter (to, from, next) {
      var user = store.state.userModule.user
      if (user) {
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
  mode: 'history', // for not having the # in the URL
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = store.state.userModule.user
  const userRoles = store.state.userModule.userDetails.userRoles
  if (userRoles === null) {
    console.log('NO USER ROLES FOUND...')
  }

  const doesntRequireAuth = to.matched.some(record => record.meta && record.meta.requiresAuth === false)

  if (doesntRequireAuth === false && !currentUser) {
    // try auto login
    next('/home')
  } else {
    next()
  }
})

const checkIfPublican = function (next) {
  const roles = store.state.userModule.userDetails.userRoles
  if (!roles || !roles.publican) {
    console.log('not publican - re-directing to home page')
    next('/')
  } else {
    next()
  }
}

const checkIfAdmin = function (next) {
  const roles = store.state.userModule.userDetails.userRoles
  if (!roles || !roles.admin) {
    console.log('not admin - re-directing to home page')
    next('/')
  } else {
    next()
  }
}

export default router
