<script setup lang="ts">
interface ButtonComponentProps {
  color?: 'Primary'
  fitContent?: boolean
  returnValue?: any
  disabled?: boolean
}

const { color, fitContent, returnValue, disabled = false } = defineProps<ButtonComponentProps>()
const emit = defineEmits<{
  handleClick: [value?: any]
}>()

const handleClick = () => {
  emit('handleClick', returnValue)
}
</script>

<template>
  <button
    v-bind:class="[
      'ButtonComponent',
      color ? `ButtonComponent--${color}` : '',
      fitContent ? 'ButtonComponent--FitContent' : '',
    ]"
    :disabled
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.ButtonComponent {
  cursor: pointer;
  display: block;
  border: 1px solid;
  border-radius: var(--border-radius-2);
  color: var(--color-text-primary);
  background-color: var(--color-background-secondary);
  width: 100%;
  padding: 0.5rem;
  font-size: 1em;

  &--FitContent {
    display: inline-block;
    width: fit-content;
  }

  &--Primary {
    color: var(--color-text-secondary);
    background-color: var(--color-background-primary);
  }
}
</style>
