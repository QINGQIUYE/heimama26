import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import login from '../components/login.vue';
import main from '../components/main.vue';
import user from '../components/user.vue'
import roles from '../components/roles.vue'
import rights from '../components/rights.vue'
import goods from '../components/goods.vue'
import orders from '../components/orders.vue'
import reports from '../components/reports.vue'
import categories from '../components/categories.vue'
import params from '../components/params.vue'
let routes=[
    { path: '/login', component:login },
  { path: '/', component: main,
  children:[
    {
      path:'users',
      component:user, 
    },
    {
      path:'roles',
      component:roles, 
    },
    {
      path:'rights',
      component:rights, 
    },
    {
      path:'goods',
      component:goods, 
    },
    {
      path:'orders',
      component:orders, 
    },
    {
      path:'reports',
      component:reports, 
    },
    {
      path:'categories',
      component:categories, 
    },
    {
      path:'params',
      component:params, 
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
