import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useAuthStore from './stores/auth'

import './assets/reset.scss'
import './assets/colors.scss'
import './assets/measurements.scss'
import './assets/utilities.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const auth = useAuthStore()
await auth.init()

app.use(router)

app.mount('#app')
