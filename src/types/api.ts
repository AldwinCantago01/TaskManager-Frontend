interface LoginFormValues {
  username: string
  password: string
}

interface RegisterFormValues extends LoginFormValues {
  confirmPassword: string
}

interface UserFormMessage {
  general: string
  username: string
  password: string
}

interface User {
  id: string
  username: string
}

export type { LoginFormValues, RegisterFormValues, UserFormMessage, User }
