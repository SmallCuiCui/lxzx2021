import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/css/global.css'

createApp(App).use(router).use(ElementPlus, {locale: zhCn,}).mount('#app')
