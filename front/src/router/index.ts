import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Form from '../pages/Form.vue'
import bookingRecap from '../pages/bookingRecap.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/booking',
    name: 'form',
    component: Form
  },
  {
    path: '/recap',
    name: 'recap',
    component: bookingRecap
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router