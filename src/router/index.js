import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Messanger from '../views/Messanger.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/messanger',
    name: 'Messanger',
    component: Messanger,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
