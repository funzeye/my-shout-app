import Vue from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CreateNew from '../views/CreateNew.vue'
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
      },
      {
        path: 'create-new',
        component: CreateNew,
        name: 'create-new',
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
