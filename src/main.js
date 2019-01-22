import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/base.css"
Vue.use(ElementUI);
Vue.config.productionTip = false
import VusAxios from "./lib/axios"
Vue.use(VusAxios);
import router from './lib/router';
import myBreadcrumb from './components/myBreadcrumb.vue';
import moment from 'moment'
Vue.component('myBreadcrumb',myBreadcrumb )
// 时间戳
Vue.filter('beautifyTime', (value)=>{
  return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
})
new Vue({
  el:"#app",
  router,
  render:h=>h(App)
})

