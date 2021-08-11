import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router