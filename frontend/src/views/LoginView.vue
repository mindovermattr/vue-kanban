<script setup lang="ts">
import VFormSignIn from '@/components/VForm/VFormSign.vue'
import { toRef } from 'vue'

interface IProps {
  signUp: boolean
}

const props = defineProps<IProps>()

const sign = toRef(props.signUp)

const toggleSignUp = () => {
  sign.value = !sign.value
}
</script>

<template>
  <div>
    <VFormSignIn v-if="signUp" @toogleSignUp="toggleSignUp" :sign-up="sign" />
    <VFormSignIn v-else @toogleSignUp="toggleSignUp" :sign-up="sign" />
  </div>
</template>
