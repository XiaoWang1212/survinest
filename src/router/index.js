import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ScanPage from '../views/ScanPage.vue'
import SuppliesPage from '../views/SuppliesPage.vue'
import EmergencyPage from '../views/EmergencyPage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/scan',
    name: 'Scan',
    component: ScanPage
  },
  {
    path: '/supplies',
    name: 'Supplies',
    component: SuppliesPage
  },
  {
    path: '/emergency',
    name: 'Emergency',
    component: EmergencyPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
