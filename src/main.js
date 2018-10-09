// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

Vue.use(ElementUI)

//引入Velocity.js动画库
import  Velocity from 'velocity-animate';

//引入jquery
import $ from 'jquery';





//引入播放视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)


//全局组件
import Crumbs from '@/components/crumbs/index.js'; // 导入自己写的组件文件
Vue.use(Crumbs); // 自定义全局组件的时候需要Vue.use();

import Lines from '@/components/Lines/index.js'; // 导入自己写的组件文件
Vue.use(Lines);

import Dialog from '@/components/dialog/index.js'; // 导入自己写的组件文件
Vue.use(Dialog);



/* eslint-disable no-new */
//引入公共组件

import reset from "./assets/css/reset.css";
import common from "./assets/css/common.css";

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
