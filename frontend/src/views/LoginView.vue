<script setup lang="ts">
import VFormSignIn from '@/components/VForm/VFormSign.vue'

interface IProps {
  signUp: boolean
}

defineProps<IProps>()
</script>

<template>
  <div>
    <VFormSignIn :sign-up="signUp" />
  </div>
</template>
