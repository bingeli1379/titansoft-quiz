import cookies from 'js-cookie'
import { useAuthStore } from '@/stores/auth'

import type { Router } from 'vue-router'

export const useMiddleware = (router: Router) => {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    if (authStore.token === null) {
      authStore.setToken(cookies.get('token') ?? null)
    }

    if (authStore.token && authStore.profile === null) {
      await authStore.getProfileHandler()
      if (authStore.profile === null) {
        authStore.logoutHandler()
      }
    }

    if (to.meta.requireAuth === true && authStore.profile === null) {
      return { name: 'Otp' }
    }

    if (to.meta.requireAuth === false && authStore.profile !== null) {
      return { name: 'Profile' }
    }
  })
}
