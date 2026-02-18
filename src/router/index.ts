import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth'
import Home from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Tasks from '@/views/Tasks.vue'
import AddTask from '@/views/AddTask.vue'
import EditTask from '@/views/EditTask.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      component: Register,
      meta: { guestOnly: true },
    },
    {
      path: '/tasks',
      component: Tasks,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/add',
      component: AddTask,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks/edit/:id',
      component: EditTask,
      meta: { requiresAuth: true },
      beforeEnter: (to) => {
        const { id } = to.params
        const parsedTaskId = Number(id)
        const isIdInteger = Number.isInteger(parsedTaskId)
        if (!isIdInteger || (isIdInteger && parsedTaskId <= 0)) {
          return { name: 'NotFound' }
        }
        return true
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    return '/'
  }
  if (to.meta.guestOnly && authStore.user) {
    return '/tasks'
  }
})

export default router
