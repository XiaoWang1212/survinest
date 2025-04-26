import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ScanPage from '@/views/ScanPage.vue'
import SurvivalKitPage from '@/views/SurvivalKitPage.vue'
import StartPage from '@/views/StartPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  { path: '/', name: 'StartPage', component: StartPage },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/scan', name: 'ScanPage', component: ScanPage },
  { path: '/survival-kit', name: 'SurvivalKitPage', component: SurvivalKitPage },
  { path: '/login', name: 'LoginPage', component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router