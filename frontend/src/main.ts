import './assets/Null.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const store = createPinia()

app.use(router).use(store).mount('#app')
