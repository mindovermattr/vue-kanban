<template>
  <VLayout class="invite">
    <VButton @click="accept" variant="contained">Принять приглашение</VButton>
  </VLayout>
</template>

<script setup lang="ts">
import { acceptInvite } from '@/api/Users.api'
import VButton from '@/components/VButton.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import axios from 'axios'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface IProps {
  deskId: string
  inviteHash: string
}

const props = defineProps<IProps>()
const router = useRouter()

const acceptLink = computed(() => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  return `${backendUrl}${window.location.pathname}`
})

const accept = async () => {
  const resp = await acceptInvite(acceptLink.value)
  if (axios.isAxiosError(resp)) {
    router.push({ name: 'home', query: { message: 'errorInvite' } })
  } else {
    router.push({ path: `/desk/${props.deskId}`, query: { message: 'successInvite' } })
  }
}

console.log(acceptLink.value)
</script>

<style lang="scss">
.invite {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
