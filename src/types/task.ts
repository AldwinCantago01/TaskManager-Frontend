interface Task {
  id: number
  title: string
  finished: boolean
  isDeleted: boolean
  createdAt: string
  updateAt: string
}

interface TaskFormValues {
  title: string
  finished: boolean
}

interface TaskFormMessage {
  general: string
  title: string
}

export type { Task, TaskFormValues, TaskFormMessage }
