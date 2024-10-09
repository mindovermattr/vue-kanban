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
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('../views/LoginView.vue'),
      props: { signUp: true },
    },
  ],
})

export default router
