import { createApp } from 'vue'

import App from './App'
import router from './router'
import "./global.less"

createApp(App).use(router).mount('#app')
