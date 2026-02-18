import router from '@/router'
import useAuthStore from '@/stores/auth'

const customFetch = async (route: string, options = {}) => {
  const token = localStorage.getItem('token')

  const res = await fetch(route, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  if (res.status === 401) {
    const authStore = useAuthStore()
    authStore.logout()

    if (router.currentRoute.value.path !== '/') {
      await router.replace('/')
    }
  }

  return res
}

export default customFetch
