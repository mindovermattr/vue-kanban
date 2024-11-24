import type { TUserFormLogin, TUserRegistration } from '@/@types/requests/TUserLogin'
import type { TUserResponse } from '@/@types/responses/TUserResponse'
import type { TUser } from '@/@types/TUser'
import { login as loginApi, logout as logoutApi, signUp } from '@/api/Auth.api'
import { LOCAL_STORAGE_USER } from '@/constants/LocalStorageKeys'
import { getUserFromLS } from '@/helpers/getUserFromLS'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    ...(getUserFromLS() as { user: TUser; token: string }),
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    async register(user: TUserRegistration) {
      const response = (await signUp(user)) as TUserResponse

      if (response?.data) {
        localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify({
            user: response.data,
            token: response.token,
          })
        )
        this.user = response.data
        this.token = response.token
      } else {
        return response
      }
    },
    async login(user: TUserFormLogin) {
      const response = (await loginApi(user)) as TUserResponse
      if (response?.data) {
        localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify({
            user: response.data,
            token: response.token,
          })
        )
        this.user = response.data
        this.token = response.token
      } else {
        return response
      }
    },
    async logout() {
      const response = await logoutApi()
      return response
    },
  },
})
