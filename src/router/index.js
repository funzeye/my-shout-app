import Vue from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CreateNew from '../views/CreateNew.vue'
import TabRoot from '../components/TabRoot.vue'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
import { IonicVueRouter } from '@ionic/vue'
Vue.use(IonicVueRouter)

const routes = [

  // {
  //   path: '',
  //   component: TabRoot
  // },
  // {
  //   path: '/about',
  //   component: About
  // },
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
        name: 'home'
      },
      {
        path: 'about',
        component: About,
        name: 'about'
      },
      {
        path: 'create-new',
        component: CreateNew,
        name: 'create-new'
      }
    ]
  },
  { path: '/', redirect: '/tabs/home' },
  { path: '*', redirect: '/tabs/home' }

  // { path: '' }
]

const router = new IonicVueRouter({
  mode: 'history', // for not having the # in the URL
  routes
})

export default router
