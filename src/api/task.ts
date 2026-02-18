import type { TaskFormValues, TaskFormMessage } from '@/types/task'
import router from '@/router'
import useTaskStore from '@/stores/tasks'
import customFetch from '@/api/api'
import routes from '@/api/routes'

const addTask = async (taskFormValues: TaskFormValues, taskFormMessage: TaskFormMessage) => {
  try {
    const res = await customFetch(routes.task, {
      method: 'POST',
      body: JSON.stringify({
        title: taskFormValues.title,
        finished: taskFormValues.finished,
      }),
    })

    const data = await res.json()

    switch (res.status) {
      case 201:
        const taskStore = useTaskStore()
        taskStore.message = 'Sucessfully added your tasks!'
        router.push('/tasks')
      case 400:
        taskFormMessage.title = data.errors?.title ? data.errors?.title[0] : ''
        break
      case 500:
        taskFormMessage.general = data.message
        break
    }
  } catch (err) {
    console.error('Encountered an error: ', err)
    taskFormMessage.general = 'Something went wrong. Please try again in a moment.'
  }
}

const getTask = async (id: number) => {
  const res = await customFetch(routes.linkTaskId(Number(id)), {
    method: 'GET',
  })

  const data = await res.json()
  if (res.status === 200) {
    return data
  } else {
    throw new Error(`Status: ${res.status} Body: ${data}`)
  }
}

const updateTask = async (
  id: number,
  taskFormValues: TaskFormValues,
  taskFormMessage: TaskFormMessage,
) => {
  try {
    const res = await customFetch(routes.task, {
      method: 'PUT',
      body: JSON.stringify({
        taskId: id,
        title: taskFormValues.title,
        finished: taskFormValues.finished,
      }),
    })

    const data = await res.json()

    switch (res.status) {
      case 200:
        const taskStore = useTaskStore()
        taskStore.message = 'Sucessfully updated your tasks!'
        router.push('/tasks')
      case 400:
        taskFormMessage.general = data.errors?.taskId ? data.errors?.taskId[0] : ''
        taskFormMessage.title = data.errors?.title ? data.errors?.title[0] : ''
        break
      case 500:
        taskFormMessage.general = data.message
        break
    }
  } catch (err) {
    console.error('Encountered an error: ', err)
    taskFormMessage.general = 'Something went wrong. Please try again in a moment.'
  }
}

export { addTask, getTask, updateTask }
