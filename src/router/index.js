import Vue from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CreateNewPub from '../views/CreateNewPub.vue'
import CreateNewPubTables from '../views/CreateNewPubTables.vue'
import CreateNewPubFloorArea from '../views/CreateNewPubFloorArea.vue'
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
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: Home,
        name: 'home',
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
    path: '/create-new-pub-tables',
    component: CreateNewPubTables,
    name: 'create-new-pub-tables',
    beforeEnter (to, from, next) {
      console.log('navigating to create-new-pub-tables page.')
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
  { path: '/', redirect: '/tabs/home' },
  { path: '*', redirect: '/tabs/home' }

  // { path: '' }
]

const router = new IonicVueRouter({
  mode: 'history', // for not having the # in the URL
  routes
})

router.beforeEach((to, from, next) => autoLogin.then(next))

export default router
