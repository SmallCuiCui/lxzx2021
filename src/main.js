import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/css/global.css'

import * as ajax from "@/request"

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent 
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

import moment from 'moment'; 
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent 
]);

const app = createApp(App);

// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$http = ajax;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$route = router;

app.use(router).use(ElementPlus, {locale: zhCn,}).mount('#app')
