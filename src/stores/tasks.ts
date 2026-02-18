import type { Task } from '@/types/task'
import { defineStore } from 'pinia'
import customFetch from '@/api/api'
import routes from '@/api/routes'

const genericSuccessMessage = (action: 'updated' | 'deleted') => `Sucessfully ${action} your tasks!`
const genericErrorMessage = (action: 'getting' | 'updating' | 'deleting') =>
  `Something went wrong while ${action} your tasks. Please try again.`

const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: null as Task[] | null,
    message: '',
  }),
  actions: {
    async refreshTask() {
      try {
        const res = await customFetch(routes.task, {
          method: 'GET',
        })
        if (!res.ok) {
          this.message = genericErrorMessage('getting')
          return
        }
        const data = await res.json()
        this.tasks = data.tasks
      } catch (err) {
        console.error(err)
        this.message = genericErrorMessage('getting')
      }
    },

    async changeTaskStatus(id: number) {
      const tasks = this.tasks
      if (!tasks) {
        this.message = genericErrorMessage('updating')
        return
      }
      const task = tasks.find((task) => task.id == id)
      if (!task) {
        this.message = genericErrorMessage('updating')
        return
      }
      try {
        const res = await customFetch(routes.task, {
          method: 'PUT',
          body: JSON.stringify({
            taskId: task.id,
            title: task.title,
            finished: !task.finished,
          }),
        })
        if (!res.ok) {
          this.message = genericErrorMessage('updating')
          return
        }
        await this.refreshTask()
        this.message = genericSuccessMessage('updated')
      } catch (err) {
        console.error(err)
        this.message = genericErrorMessage('updating')
      }
    },

    async deleteTask(id: number) {
      const tasks = this.tasks
      if (!tasks) {
        this.message = genericErrorMessage('deleting')
        return
      }
      const task = tasks.find((task) => task.id == id)
      if (!task) {
        this.message = genericErrorMessage('deleting')
        return
      }
      try {
        const res = await customFetch(routes.linkTaskId(id), {
          method: 'DELETE',
        })
        if (!res.ok) {
          this.message = genericErrorMessage('deleting')
          return
        }
        await this.refreshTask()
        this.message = genericSuccessMessage('deleted')
      } catch (err) {
        console.error(err)
        this.message = genericErrorMessage('deleting')
      }
    },
  },
})

export default useTaskStore
