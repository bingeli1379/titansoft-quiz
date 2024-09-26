import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: () => import('@/views/Profile.vue')
    },
    {
      path: '/otp',
      name: 'Otp',
      component: () => import('@/views/Otp.vue')
    }
  ]
})

export default router
