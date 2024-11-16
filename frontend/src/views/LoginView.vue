<script setup lang="ts">
import VFlash from '@/components/VFlash/VFlash.vue'
import VFormSignIn from '@/components/VForm/VFormSign.vue'
import VLayout from '@/components/VLayout/VLayout.vue'
import { useFlashStore } from '@/store/useFlashStore'
import { onMounted, toRef } from 'vue'
import { useRoute } from 'vue-router'

interface IProps {
  signUp: boolean
}

const props = defineProps<IProps>()

const flasStore = useFlashStore()

const sign = toRef(props.signUp)

const route = useRoute()

const toggleSignUp = () => {
  sign.value = !sign.value
}
onMounted(() => {
  if (route.query.message === 'expireJWT')
    flasStore.openFlash('Ваша сессия истекла! Войдите в систему снова.', 4000, 'error')
})
</script>

<template>
  <VLayout>
    <VFormSignIn v-if="signUp" @toogleSignUp="toggleSignUp" :sign-up="sign" />
    <VFormSignIn v-else @toogleSignUp="toggleSignUp" :sign-up="sign" />
    <template #modal>
      <VFlash @closeFlash="flasStore.closeFlash" />
    </template>
  </VLayout>
  <main></main>
</template>
