import type { User } from '@/types/api'
import { defineStore } from 'pinia'
import customFetch from '@/api/api'
import routes from '@/api/routes'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    ready: false,
    communicationError: false,
  }),
  actions: {
    async init() {
      const token = localStorage.getItem('token')

      if (!token) {
        this.user = null
        this.ready = true
        return
      }

      try {
        const res = await customFetch(routes.authenticatedUser)
        const data = await res.json()

        if (res.ok) {
          this.user = data.user
        } else if (res.status === 401) {
          this.logout()
        } else if (res.status === 500) {
          this.communicationError = true
        }
      } catch (err) {
        console.error(err)
        this.communicationError = true
      } finally {
        this.ready = true
      }
    },
    async setUser(user: User) {
      this.user = user
    },
    logout() {
      localStorage.removeItem('token')
      this.user = null
    },
  },
})

export default useAuthStore
