import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ScanPage from '@/views/ScanPage.vue'
import SurvivalKitPage from '@/views/SurvivalKitPage.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/scan', name: 'ScanPage', component: ScanPage },
  { path: '/survival-kit', name: 'SurvivalKitPage', component: SurvivalKitPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router