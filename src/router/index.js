import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/dashboard',
    // name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    children: [
      {
        path: '/',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/F90rVF7OEfhW',
        name: 'data_master',
        component: () => import(/* webpackChunkName: "about" */ '../views/adm/DatamasterView.vue'),
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/F47JdIHuxXB5',
        name: 'transaksi',
        component: () => import(/* webpackChunkName: "about" */ '../views/adm/TransaksiView.vue'),
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Ev787fv9Alri',
        name: 'laporan',
        component: () => import(/* webpackChunkName: "about" */ '../views/adm/LaporanView.vue'),
        meta: { 
          requiresAuth: true
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isLoggedIn) {
      next({ path: '/login' })
    }
    next()
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (Store.getters.isLoggedIn) {
      next({ path: '/dashboard' })
    }
    next()
  }
})

export default router
