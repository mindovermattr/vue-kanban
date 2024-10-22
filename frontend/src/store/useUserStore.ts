import { login as loginApi, logout as logoutApi, signUp } from '@/api/User.api'
import { LOCAL_STORAGE_USER } from '@/constants/LocalStorageKeys'
import { getUserFromLS } from '@/helpers/getUserFromLS'
import type { TUserLogin, TUserRegistration } from '@/types/requests/TUserLogin'
import type { TUserRespRegistration } from '@/types/responses/TUserResponse'
import type { TUser } from '@/types/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUserFromLS()?.user as TUser | null,
    token: getUserFromLS()?.token as string | null,
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    async register(user: TUserRegistration) {
      const response = (await signUp(user)) as TUserRespRegistration

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
    async login(user: TUserLogin) {
      const response = (await loginApi(user)) as TUserRespRegistration
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
