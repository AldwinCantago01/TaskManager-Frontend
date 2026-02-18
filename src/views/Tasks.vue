<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'
import useAuthStore from '@/stores/auth'
import useTaskStore from '@/stores/tasks'
import TaskList from '@/components/TaskList.vue'
import CustomButton from '@/components/Button.vue'
import Notification from '@/components/forms/Notification.vue'
import Header from '@/components/Header.vue'

const authStore = useAuthStore()
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.refreshTask()
})

onUnmounted(() => {
  taskStore.$reset()
})

const onNotificationClose = () => {
  taskStore.message = ''
}
const handleLogout = () => {
  authStore.logout()
  router.replace('/')
}
</script>

<template>
  <div class="TasksContainer">
    <Header> Task List </Header>
    <Notification v-if="taskStore.message !== ''" @handleClose="onNotificationClose">
      {{ taskStore.message }}
    </Notification>
    <TaskList />
    <div class="TasksContainer__Buttons">
      <CustomButton :fitContent="true" @handleClick="handleLogout"> Logout </CustomButton>
      <RouterLink class="btn" to="/tasks/add">Add Task</RouterLink>
    </div>
  </div>
</template>

<style scope lang="scss">
.TasksContainer {
  padding: 2rem;
  border-radius: var(--border-radius-3);
  box-shadow: 0px 0px 8px var(--color-shadow-3);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__Buttons {
    display: flex;
    justify-content: space-between;
  }
}

@media (min-width: 768px) {
  .TasksContainer {
    width: 75%;
  }
}

@media (min-width: 1024px) {
  .TasksContainer {
    width: 65%;
  }
}

@media (min-width: 1280px) {
  .TasksContainer {
    width: 55%;
  }
}
</style>
