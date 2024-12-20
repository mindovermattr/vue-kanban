<template>
  <VModal @closeModal="emit('closeModal')" :is-visible="isVisible">
    <form class="form">
      <label for="">Введите новое имя</label>
      <VField placeholder="Ввдете новое " name="name" type="text" />
      <button type="button">Изменить</button>
      <button @click="emit('closeModal')" type="button">Закрыть</button>
    </form>
  </VModal>
</template>

<script setup lang="ts">
import VField from '@/components/VField/VField.vue'
import VModal from '../VModal.vue'

interface IProps {
  isVisible: boolean
}
const props = defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()

const clickHander = () => {}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  gap: 8px;
}
</style>
