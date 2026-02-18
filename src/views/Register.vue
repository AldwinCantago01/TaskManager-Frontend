<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import InputField from '@/components/forms/InputField.vue'
import CustomButton from '@/components/Button.vue'
import Notification from '@/components/forms/Notification.vue'
import { registerUser } from '@/api/auth'

let values = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

let messages = reactive({
  general: '',
  username: '',
  password: '',
})

const onNotificationClose = () => {
  messages.general = ''
}

const onUsernameChange = (value: string) => {
  messages.username = ''
  values.username = value
}
const onPasswordChange = (value: string) => {
  messages.password = ''
  values.password = value
}
const onConfirmPasswordChange = (value: string) => {
  values.confirmPassword = value
}

const onFormSubmit = () => {
  messages.general = ''
  registerUser(values, messages)
}
</script>

<template>
  <div class="RegisterContainer">
    <h1 class="RegisterContainer__Header">Register</h1>
    <form class="RegisterContainer__Form" @submit.prevent>
      <Notification v-if="messages.general !== ''" @handleClose="onNotificationClose">
        {{ messages.general }}
      </Notification>
      <InputField
        label="Username"
        type="text"
        placeholder="Enter your username..."
        v-bind:value="values.username"
        v-bind:message="messages.username"
        @handleChange="onUsernameChange"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password..."
        v-bind:value="values.password"
        v-bind:message="messages.password"
        @handleChange="onPasswordChange"
      />
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password..."
        v-bind:value="values.confirmPassword"
        @handleChange="onConfirmPasswordChange"
      />
      <div class="RegisterContainer__Button">
        <CustomButton color="Primary" @handleClick="onFormSubmit"> Register </CustomButton>
        <RouterLink class="btn" to="/"> Back </RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.RegisterContainer {
  padding: 2rem;
  border-radius: var(--border-radius-3);
  box-shadow: 0px 0px 8px var(--color-shadow-3);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__Header {
    display: flex;
    justify-content: center;
  }

  &__Form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__Button {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 5px;
  }
}

@media (min-width: 768px) {
  .RegisterContainer {
    width: 55%;
  }
}

@media (min-width: 1024px) {
  .RegisterContainer {
    width: 45%;
  }
}

@media (min-width: 1280px) {
  .RegisterContainer {
    width: 30%;
  }
}
</style>
