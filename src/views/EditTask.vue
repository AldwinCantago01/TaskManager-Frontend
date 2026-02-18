<script setup lang="ts">
import type { TaskFormMessage, TaskFormValues } from '@/types/task'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import CustomButton from '@/components/Button.vue'
import TaskForm from '@/components/forms/TaskForm.vue'
import { getTask, updateTask } from '@/api/task'

const route = useRoute()

let formDisabled = ref(false)
let values = reactive<TaskFormValues>({
  title: '',
  finished: false,
})
let messages = reactive<TaskFormMessage>({
  general: '',
  title: '',
})

onMounted(async () => {
  const { id } = route.params

  try {
    const { task } = await getTask(Number(id))
    values.title = task.title
    values.finished = task.finished
  } catch (err) {
    console.error(err)
    messages.general = 'We couldn’t load your data right now. Please try again in a moment.'
    formDisabled.value = true
  }
})

const onFormSubmit = () => {
  const { id } = route.params
  messages.general = ''
  updateTask(Number(id), values, messages)
}
</script>

<template>
  <div class="EditTaskContainer">
    <Header> Edit Task </Header>
    <TaskForm :values :messages :formDisabled />
    <div class="EditTaskContainer__Button">
      <RouterLink class="btn" to="/tasks"> Back </RouterLink>
      <CustomButton
        :fitContent="true"
        color="Primary"
        :disabled="formDisabled"
        @handleClick="onFormSubmit"
      >
        Edit Task
      </CustomButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.EditTaskContainer {
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
  .EditTaskContainer {
    width: 65%;
  }
}

@media (min-width: 1024px) {
  .EditTaskContainer {
    width: 55%;
  }
}

@media (min-width: 1280px) {
  .EditTaskContainer {
    width: 45%;
  }
}
</style>
