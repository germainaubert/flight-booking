import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Form from '../pages/Form.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router