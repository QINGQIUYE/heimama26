import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import login from '../components/login.vue';
import main from '../components/main.vue';
import user from '../components/user.vue'
let routes=[
    { path: '/login', component:login },
  { path: '/', component: main,
  children:[
    {
      path:'users',
      component:user 
    },
  ]
}
]
let router = new VueRouter({
    routes 
})
router.beforeEach((to, from, next) => {
  // `to` 和 `from` 都是路由对象
  if (to.path==="/login") {
    next()
  }else {
    let token=window.sessionStorage.getItem('token')
    if (token) {
      next()
    }else{
     Vue.prototype.$message.error('你还没有登录')
      next('/login')
    }
  }
})
export default router
