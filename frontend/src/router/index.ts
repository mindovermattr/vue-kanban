import { getUserFromLS } from '@/helpers/getUserFromLS'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('../views/LoginView.vue'),
      props: { signUp: false },
    },
  ],
})

router.beforeEach((to) => {
  const isAuth = getUserFromLS()
  if (isAuth) {
    return true
  } else {
    if (to.name === 'SignIn') {
      return true
    } else {
      return { name: 'SignIn' }
    }
  }
})

export default router
