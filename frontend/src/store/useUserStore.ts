import { login, signUp } from '@/api/User.api'
import type { TUserLogin, TUserRegistration } from '@/types/requests/TUserLogin'
import type { TUser } from '@/types/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as TUser | null,
    token: null as string | null,
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    async register(user: TUserRegistration) {
      const response = await signUp(user)
      if (response?.data) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: response.data,
            token: response.token,
          })
        )
        this.user = response.data
        this.token = response.token
      }
    },
    async login(user: TUserLogin) {
      const response = await login(user)
      if (response?.data) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: response.data,
            token: response.token,
          })
        )
        this.user = response.data
        this.token = response.token
      }
    },
  },
})
