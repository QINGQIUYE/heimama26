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
new Vue({
  el:"#app",
  router,
  render:h=>h(App)
})

