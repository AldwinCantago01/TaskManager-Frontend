const routes = {
  register: '/api/auth/user',
  login: '/api/auth/login',
  authenticatedUser: '/api/user/me',
  task: '/api/task',
  linkTaskId: (id: number) => `/api/task/${id}`,
}

export default routes
