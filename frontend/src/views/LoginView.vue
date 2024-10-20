<script setup lang="ts">
import VFlash from '@/components/VFlash/VFlash.vue'
import VFormSignIn from '@/components/VForm/VFormSign.vue'
import { ref, toRef } from 'vue'
import { useRoute } from 'vue-router'

interface IProps {
  signUp: boolean
}

const props = defineProps<IProps>()

console.log(props)

const sign = toRef(props.signUp)
const route = useRoute()
const isVisible = ref(route.query.message === 'expireJWT' ? true : false)

const closeFlash = () => {
  isVisible.value = false
}

const toggleSignUp = () => {
  sign.value = !sign.value
}
</script>

<template>
  <main>
    <VFormSignIn v-if="signUp" @toogleSignUp="toggleSignUp" :sign-up="sign" />
    <VFormSignIn v-else @toogleSignUp="toggleSignUp" :sign-up="sign" />
    <VFlash
      color="red"
      @set-close="closeFlash"
      :is-visible="isVisible"
      :step="500"
      :time-in-ms="4000"
      >{{ 'Время вашей сессии истекло. Пожалуйста, войдите в систему снова' }}</VFlash
    >
  </main>
</template>
