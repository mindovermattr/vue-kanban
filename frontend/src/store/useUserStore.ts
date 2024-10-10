import { login, signUp } from '@/api/User.api'
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
    register: async (user: { user: TUser }) => {
      const resp = await signUp(user)
      if (resp?.data) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: resp?.data.data,
            token: resp?.token,
          })
        )
      }
    },
    login: async (user: { user: TUser }) => {
      const response = await login(user)

      if (response?.data) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: response?.data,
            token: response?.token,
          })
        )
      }
    },
  },
})
