import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/attractions',
      component: () => import('@/views/AttractionsView.vue')
    },
    {
      path: '/activitys',
      component: () => import('@/views/ActivitysView.vue')
    },
    {
      path: '/foods',
      component: () => import('@/views/foodsView.vue')
    }
  ]
})

export default router
