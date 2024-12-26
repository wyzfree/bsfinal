import './assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'  
import 'element-plus/dist/index.css'

// 导入路由器
import router from './router'

import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
// 用于传递token
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

