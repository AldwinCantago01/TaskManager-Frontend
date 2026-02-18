<script setup lang="ts">
import type { TaskFormValues, TaskFormMessage } from '@/types/task'
import Notification from '@/components/forms/Notification.vue'
import InputField from '@/components/forms/InputField.vue'

interface TaskFormProps {
  values: TaskFormValues
  messages: TaskFormMessage
  formDisabled?: boolean
}

const { values, messages, formDisabled = false } = defineProps<TaskFormProps>()

const handleNotificationClose = () => {
  messages.general = ''
}
const handleTitleChange = (value: string) => {
  messages.title = ''
  values.title = value
}
const handleFinishedChange = (value: boolean) => {
  messages.title = ''
  values.finished = value
}
</script>

<template>
  <form class="TaskFormComponent" @submit.prevent>
    <Notification v-if="messages.general !== ''" @handleClose="handleNotificationClose">
      {{ messages.general }}
    </Notification>
    <InputField
      label="Title"
      type="text"
      placeholder="Enter task title..."
      v-bind:value="values.title"
      v-bind:message="messages.title"
      @handleChange="handleTitleChange"
      :disabled="formDisabled"
    />
    <InputField
      label="Finished"
      type="checkbox"
      v-bind:rowFlexDirection="true"
      v-bind:value="values.finished"
      :disabled="formDisabled"
      @handleChange="handleFinishedChange"
    />
  </form>
</template>

<style scoped lang="scss">
.TaskFormComponent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
