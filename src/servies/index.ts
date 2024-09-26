import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_URL
})

service.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    return {
      ...config,
      withCredentials: true,
      Authorization: authStore.token
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
