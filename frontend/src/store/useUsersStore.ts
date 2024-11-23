import type { TUser } from '@/@types/TUser'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const currentUser = ref<TUser>()
})
