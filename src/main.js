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
Vue.component('myBreadcrumb',myBreadcrumb )
new Vue({
  el:"#app",
  router,
  render:h=>h(App)
})

