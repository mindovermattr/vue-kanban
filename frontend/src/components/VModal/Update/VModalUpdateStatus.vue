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
import { useRouteParams } from '@/@composables/useRouteParams'
import type { TStatus } from '@/@types/responses/TStatusResponse'
import VButton from '@/components/VButton.vue'
import VField from '@/components/VField/VField.vue'
import { useCardStore } from '@/store/useCardsStore'
import { useStatusStore } from '@/store/useStatusStore'
import { ref } from 'vue'
import VModal from '../VModal.vue'

interface IProps {
  isVisible: boolean
  status: TStatus
}

const name = ref('')

const props = defineProps<IProps>()
const statusStore = useStatusStore()
const cardStore = useCardStore()
const { id } = useRouteParams('id')
const emit = defineEmits<(e: 'closeModal') => void>()

const updateHandler = async () => {
  const result = await statusStore.updateStatus(+id, props.status, name.value)
  if (result) cardStore.setFiltredCardsByStatus(cardStore.cards)

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
