import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Home = () => import('/page/home/home.vue')
const Analysis = () => import('/page/analysis/home.vue')
const AnalysisMonth = () => import('/page/analysis/month.vue')
const AnalysisViliage = () => import('/page/analysis/viliage.vue')
const Detail = () => import('/page/detail/home.vue')
const DetailAnalysis = () => import('/page/detail/analysis.vue')
const DetailHouselist = () => import('/page/detail/houselist.vue')
const DetailMap = () => import('/page/detail/map.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Index,
      children: [
        {path: '/home', component: Home},
        {
          path: '/analysis',
          redirect: '/analysis/viliage',
          component: Analysis,
          name: 'analysis',
          children: [
            {path: '/analysis/month', component: AnalysisMonth},
            {path: '/analysis/viliage', component: AnalysisViliage}
          ]
        },
        {
          path: '/detail',
          redirect: '/detail/analysis',
          component: Detail,
          name: 'detail',
          children: [
            {path: '/detail/analysis', component: DetailAnalysis},
            {path: '/detail/houselist', component: DetailHouselist},
            {path: '/detail/map', component: DetailMap}
          ]
        }
      ]
    }
  ]
})
