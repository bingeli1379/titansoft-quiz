import { createRouter, createWebHistory } from 'vue-router'
import { useMiddleware } from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/otp',
      name: 'Otp',
      component: () => import('@/views/Otp.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Profile' }
    }
  ]
})

useMiddleware(router)

export default router
