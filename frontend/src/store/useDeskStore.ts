import { ERoles } from '@/@types/ERoles'
import type { TDesk } from '@/@types/TDesk'
import type { TUserKanban } from '@/@types/TUserKanban'
import { updateDesk } from '@/api/Desks.api'
import { changeUserRole, getUsers as getUsersApi } from '@/api/Users.api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from './useAuthStore'

export const useDeskStore = defineStore('desk', () => {
  const users = ref<TUserKanban[]>([])
  const filtredUsers = reactive<Record<ERoles, TUserKanban[]>>({ guest: [], member: [], owner: [] })

  const getRole = computed(() => {
    const authStore = useAuthStore()
    const currentUserId = authStore.getUser.id
    return users.value.find((user) => user.user_id === currentUserId)?.role
  })

  const getUsers = computed(() => {
    return users
  })

  const getFiltredUsers = computed(() => {
    return filtredUsers
  })

  const fetchUsers = async (deskId: number) => {
    const response = await getUsersApi(deskId)
    if (!axios.isAxiosError(response)) {
      users.value = response.data
      response.data.forEach((el) => {
        filtredUsers[el.role].push(el)
      })
    }
  }

  const updateUserRole = async (deskId: number, user: TUserKanban, role: ERoles) => {
    const response = await changeUserRole(deskId, user.id, role)
    if (axios.isAxiosError(response)) return response

    const userIdx = filtredUsers[user.role].findIndex((el) => {
      return el.user_id === user.user_id
    })

    filtredUsers[user.role].splice(userIdx, 1)
    filtredUsers[response.data.role].push(response.data)

    return response
  }

  //убрать
  const updateDeskName = async (desk: TDesk) => {
    const result = await updateDesk(desk)
    return result
  }
  return {
    getRole,
    getUsers,
    getFiltredUsers,
    fetchUsers,
    updateUserRole,
    updateDeskName,
  }
})
