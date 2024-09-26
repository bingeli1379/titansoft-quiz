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
      profile.value = res.data
      return res.data
    } catch (error) {
      return null
    }
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

    logoutHandler
  }
})
