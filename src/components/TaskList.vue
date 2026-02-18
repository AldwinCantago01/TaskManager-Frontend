<script setup lang="ts">
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import useTaskStore from '@/stores/tasks'
import CustomButton from '@/components/Button.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const handleTaskStatusChange = (id: number) => {
  taskStore.changeTaskStatus(id)
}
const handleTaskDelete = (id: number) => {
  taskStore.deleteTask(id)
}
</script>

<template>
  <div class="TaskListComponent">
    <div
      v-for="task in tasks"
      :key="task.id"
      :class="[
        'TaskListComponent__Task',
        task.finished ? 'TaskListComponent__Task--FinishedTask' : '',
      ]"
    >
      <div class="Task__Title">
        {{ task.title }}
      </div>
      <div class="Task__Actions">
        <CustomButton
          :fitContent="true"
          :returnValue="task.id"
          @handleClick="handleTaskStatusChange"
        >
          <CheckIcon v-if="!task.finished" class="Actions__Icon" />
          <XMarkIcon v-else class="Actions__Icon" />
        </CustomButton>
        <CustomButton :fitContent="true" :returnValue="task.id" @handleClick="handleTaskDelete">
          <TrashIcon class="Actions__Icon" />
        </CustomButton>
        <RouterLink class="btn" :to="`/tasks/edit/${task.id}`">
          <PencilIcon class="Actions__Icon" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.TaskListComponent {
  display: flex;
  flex-direction: column;
  height: 600px;
  overflow-y: auto;

  &__Task {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid;
    }

    &--FinishedTask {
      background-color: var(--color-background-finished-task);
    }

    .Task {
      &__Title {
        flex-grow: 1;
        line-height: 1.5rem;
      }

      &__Actions {
        flex: 0 0;
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;

        button {
          cursor: pointer;
          border: 1px solid;
          border-radius: 5px;
          background-color: white;
          padding: 0.25rem;
        }

        .Actions {
          &__Icon {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}

@media (max-width: 640px) {
  .TaskListComponent {
    &__Task {
      flex-direction: column;
      justify-content: normal;
      align-items: flex-start;
    }
  }
}
</style>
