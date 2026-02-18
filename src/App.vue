<script setup lang="ts">
import { RouterView } from 'vue-router'
import useAuthStore from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="Root">
    <div class="Root__Authentication" v-if="!auth.ready || (auth.ready && auth.communicationError)">
      {{
        auth.ready && auth.communicationError
          ? 'Encountered an error while communicating with the server'
          : 'Loading...'
      }}
    </div>
    <RouterView v-else />
  </div>
</template>

<style scoped lang="scss">
.Root {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
</style>
