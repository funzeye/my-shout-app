import Vue from 'vue'
import PubDetails from '../views/PubDetails.vue'
import About from '../views/About.vue'
import CreateNewPub from '../views/CreateNewPub.vue'
import EditPubTables from '../views/EditPubTables.vue'
import BookedTables from '../views/BookedTables.vue'
import CreateUserRoles from '../views/admin/CreateUserRoles.vue'
import CreateNewPubFloorArea from '../views/admin/CreateNewPubFloorArea.vue'
import ReserveTable from '../views/ReserveTable.vue'
import SearchForPub from '../views/SearchForPub.vue'
import EditTableDetails from '../views/EditTableDetails.vue'
import TabRoot from '../components/TabRoot.vue'
import SignUpPage from '../components/auth/SignUp.vue'
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
        component: SearchForPub,
        name: 'search-for-pub',
        beforeEnter (to, from, next) {
          var token = store.state.idToken
          if (token) {
            next()
          } else {
            next('/signin')
          }
        },
        children: [
          {
            path: '../:id/pub-details',
            component: PubDetails,
            name: 'pub-details',
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
        path: 'about',
        component: About,
        name: 'about',
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
        component: BookedTables,
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
    path: '/:id/reserve-table',
    component: ReserveTable,
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
    path: '/edit-pub-tables',
    component: EditPubTables,
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
    },
    children: [{
      path: ':id/edit-table-details',
      component: EditTableDetails,
      name: 'edit-table-details'
    }]
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
  mode: 'history', // for not having the # in the URL
  routes
})

router.beforeEach((to, from, next) => autoLogin.then(next))

export default router
