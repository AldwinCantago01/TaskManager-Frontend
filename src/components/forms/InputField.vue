<script setup lang="ts">
import { computed } from 'vue'

interface InputFieldComponentProps {
  label: string
  rowFlexDirection?: boolean
  type: 'text' | 'password' | 'checkbox'
  placeholder?: string
  value: any
  message?: string
  disabled?: boolean
}

const {
  label,
  rowFlexDirection = false,
  type,
  value,
  placeholder,
  message,
  disabled = false,
} = defineProps<InputFieldComponentProps>()
const displayedMessage = computed(() => (message === undefined || message === null ? '' : message))

const emit = defineEmits<{
  (e: 'handleChange', value: any): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = type === 'checkbox' ? target.checked : target.value
  emit('handleChange', value)
}
</script>

<template>
  <div :class="['InputFieldComponent', rowFlexDirection ? 'InputFieldComponent--Row' : '']">
    <label class="InputFieldComponent__Label">{{ label }}:</label>
    <input
      v-if="type === 'checkbox'"
      :type
      :checked="Boolean(value)"
      @change="handleChange"
      :disabled
    />
    <input v-else :type :placeholder :value @input="handleChange" :disabled />
    <span v-if="displayedMessage !== ''" class="InputFieldComponent__Message">
      {{ displayedMessage }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.InputFieldComponent {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &--Row {
    flex-direction: row;
    align-items: center;
  }

  input {
    border: 1px solid;
    border-radius: var(--border-radius-2);
    font-size: 1em;
    padding: 0.5em;

    &:focus {
      outline: none;
      box-shadow: 0px 0px 4px var(--color-shadow-4);
    }
  }

  &__Message {
    font-size: 0.85rem;
  }
}
</style>
