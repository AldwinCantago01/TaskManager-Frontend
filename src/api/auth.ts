import type { LoginFormValues, RegisterFormValues, UserFormMessage } from '@/types/api'
import router from '@/router'
import useAuthStore from '@/stores/auth'
import customFetch from './api'
import routes from './routes'

const handleAuthorization = async (authorization: string, loginFormMessage: UserFormMessage) => {
  try {
    localStorage.setItem('token', authorization)
    const res = await customFetch(routes.authenticatedUser)
    const data = await res.json()

    if (res.ok) {
      const authStore = useAuthStore()
      authStore.setUser(data.user)

      await router.push('/tasks')
    } else if (res.status !== 401) {
      loginFormMessage.general = data.message
    }
  } catch (err) {
    console.error('Encountered an error: ', err)
    loginFormMessage.general = 'Something went wrong. Please try again in a moment.'
  }
}

const loginUser = async (loginFormValues: LoginFormValues, loginFormMessage: UserFormMessage) => {
  try {
    const res = await customFetch(routes.login, {
      method: 'POST',
      body: JSON.stringify({
        username: loginFormValues.username,
        password: loginFormValues.password,
      }),
    })

    const data = await res.json()
    switch (res.status) {
      case 200:
        handleAuthorization(data.authorization, loginFormMessage)
      case 400:
        loginFormMessage.username = data.errors?.username ? data.errors?.username[0] : ''
        loginFormMessage.password = data.errors?.password ? data.errors?.password[0] : ''
        break
      case 401:
      case 500:
      default:
        loginFormMessage.general = data.message
    }
  } catch (err) {
    console.error('Encountered an error: ', err)
    loginFormMessage.general = 'Something went wrong. Please try again in a moment.'
  }
}

const registerUser = async (
  registerFormValues: RegisterFormValues,
  registerFormMessage: UserFormMessage,
) => {
  if (registerFormValues.password !== registerFormValues.confirmPassword) {
    registerFormMessage.password = 'Passwords do not match.'
  } else {
    try {
      const res = await customFetch(routes.register, {
        method: 'POST',
        body: JSON.stringify({
          username: registerFormValues.username,
          password: registerFormValues.password,
        }),
      })

      const data = await res.json()

      switch (res.status) {
        case 201:
        case 500:
          registerFormMessage.general = data.message
          break
        case 400:
          registerFormMessage.username = data.errors?.username ? data.errors?.username[0] : ''
          registerFormMessage.password = data.errors?.password ? data.errors?.password[0] : ''
          break
      }
    } catch (err) {
      console.error('Encountered an error: ', err)
      registerFormMessage.general = 'Something went wrong. Please try again in a moment.'
    }
  }
}

export { loginUser, registerUser }
