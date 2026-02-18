<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'handleClose'): void
}>()

const handleClose = () => {
  emit('handleClose')
}
</script>

<template>
  <div class="NotificationComponent">
    <div class="NotificationComponent__Text">
      <slot />
    </div>
    <XMarkIcon class="NotificationComponent__CloseIcon" @click="handleClose" />
  </div>
</template>

<style scoped lang="scss">
.NotificationComponent {
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: var(--border-radius-2);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  &__Text {
    flex-grow: 1;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  &__CloseIcon {
    cursor: pointer;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
}
</style>
