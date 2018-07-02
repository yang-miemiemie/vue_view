import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Home = () => import('/page/home/home.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home}
      ]
    },
    {path: '*', redirect: '/home'}
  ]
})
