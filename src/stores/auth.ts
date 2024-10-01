import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import cookies from 'js-cookie'
import { getProfile } from '@/servies/auth'

import type { Profile } from '@/servies/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  function setToken(value: string | null) {
    token.value = value
  }

  const profile = ref<Profile | null>(null)
  async function getProfileHandler(): Promise<Profile | null> {
    try {
      const res = await getProfile()
      const data = res.data
      if ('message' in data) return null

      profile.value = data
      return data
    } catch {
      return null
    }
  }

  async function loginHandler(value: string) {
    cookies.set('token', value)
    token.value = value
  }
  async function logoutHandler() {
    cookies.remove('token')
    token.value = null
    profile.value = null
  }

  return {
    token: readonly(token),
    setToken,

    profile: readonly(profile),
    getProfileHandler,

    loginHandler,
    logoutHandler
  }
})
