import { getUserFromLS } from '@/helpers/getUserFromLS'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DeskView from '../views/DeskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/desk/:id',
      name: 'desk',
      component: DeskView,
      props: true,
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
