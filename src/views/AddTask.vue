<script setup lang="ts">
import { reactive } from 'vue'
import Header from '@/components/Header.vue'
import CustomButton from '@/components/Button.vue'
import TaskForm from '@/components/forms/TaskForm.vue'
import { addTask } from '@/api/task'

let values = reactive({
  title: '',
  finished: false,
})

let messages = reactive({
  general: '',
  title: '',
})

const onFormSubmit = () => {
  messages.general = ''
  addTask(values, messages)
}
</script>

<template>
  <div class="AddTaskContainer">
    <Header> Add Task </Header>
    <TaskForm :values :messages />
    <div class="AddTaskContainer__Button">
      <RouterLink class="btn" to="/tasks"> Back </RouterLink>
      <CustomButton :fitContent="true" color="Primary" @handleClick="onFormSubmit">
        Add Task
      </CustomButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.AddTaskContainer {
  padding: 2rem;
  border-radius: var(--border-radius-3);
  box-shadow: 0px 0px 8px var(--color-shadow-3);
  width: 90%;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__Button {
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;
    margin-top: 5px;
  }
}

@media (min-width: 768px) {
  .AddTaskContainer {
    width: 65%;
  }
}

@media (min-width: 1024px) {
  .AddTaskContainer {
    width: 55%;
  }
}

@media (min-width: 1280px) {
  .AddTaskContainer {
    width: 45%;
  }
}
</style>
