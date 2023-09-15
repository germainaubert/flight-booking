import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Form from '../pages/Form.vue'
import BookingRecap from '../pages/BookingRecap.vue'
import Status from '../pages/Status.vue';

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
    component: BookingRecap
  },
  {
    path: '/status',
    name: 'status',
    component: Status
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router