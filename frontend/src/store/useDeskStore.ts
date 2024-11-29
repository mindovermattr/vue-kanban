import type { TUserKanban } from '@/@types/TUserKanban'
import { getUsers } from '@/api/Users.api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './useAuthStore'

export const useDeskStore = defineStore('desk', () => {
  const users = ref<TUserKanban[]>([])

  const getRole = computed(() => {
    const authStore = useAuthStore()
    const currentUserId = authStore.getUser.id

    return users.value.find((user) => user.user_id === currentUserId)?.role
  })

  const fetchUsers = async (deskId: number) => {
    const response = await getUsers(deskId)
    if (!axios.isAxiosError(response)) {
      users.value = response.data
    }
  }

  return {
    users,
    getRole,
    fetchUsers,
  }
})
