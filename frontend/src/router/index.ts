import { getUserFromLS } from '@/helpers/getUserFromLS'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/desk/:id',
      name: 'desk',
      component: () => import('../views/DeskView.vue'),
      props: true,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('../views/LoginView.vue'),
      props: { signUp: false },
      meta: {
        requireAuth: false,
      },
    },
  ],
})

router.beforeEach((to) => {
  const isAuth = getUserFromLS()
  if (!isAuth && to.meta.requireAuth) {
    return {
      path: '/sign-in',
      query: { redirect: to.fullPath },
    }
  } else {
    // if (to.name === 'SignIn') {
    //   return true
    // } else {
    //   return { name: 'SignIn' }
    // }
  }
})

export default router
