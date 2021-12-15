import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      auth: true,
    },
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    meta: {
      auth: true,
    },
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/results',
    name: 'results',
    meta: {
      auth: true,
    },
    component: () => import('@/views/pages/results/ResultsList.vue'),
  },
  {
    path: '/results/:id/eligible',
    name: 'results-eligible',
    meta: {
      auth: true,
    },
    component: () => import('@/views/pages/results/EligibleProgrammes.vue'),
  },
  {
    path: '/universities',
    name: 'universities',
    meta: {
      auth: true,
    },
    component: () => import('@/views/pages/universities/Universities.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auth: true,
    },
    component: () => import('@/views/pages/about/About.vue'),
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
      auth: false,
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Course recommender'
  next()
})

Vue.router = router

export default Vue.router
