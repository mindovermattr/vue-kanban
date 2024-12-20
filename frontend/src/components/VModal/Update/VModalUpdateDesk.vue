<template>
  <VModal @closeModal="emit('closeModal')" :is-visible="isVisible">
    <form class="form">
      <label class="form__title">Введите новое имя</label>
      <VField v-model="name" placeholder="Ввдете новое " name="name" type="text" />
      <VButton variant="contained" @click="updateHandler" type="button">Изменить</VButton>
      <VButton variant="contained" @click="emit('closeModal')" type="button">Закрыть</VButton>
    </form>
  </VModal>
</template>

<script setup lang="ts">
import type { TDesk } from '@/@types/TDesk'
import VButton from '@/components/VButton.vue'
import VField from '@/components/VField/VField.vue'
import { useDeskStore } from '@/store/useDeskStore'
import { inject, ref } from 'vue'
import VModal from '../VModal.vue'

interface IProps {
  isVisible: boolean
  desk: TDesk
}

const name = ref('')

const updateDesk = inject<Function>('updateDesk')

const props = defineProps<IProps>()
const deskStore = useDeskStore()
const emit = defineEmits<(e: 'closeModal') => void>()

const updateHandler = async () => {
  const result = await deskStore.updateDeskName({ ...props.desk, name: name.value })
  updateDesk!(result?.data)
  emit('closeModal')
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  gap: 12px;
  flex-direction: column;
  &__title {
    @include font-h3();
  }
}
</style>
