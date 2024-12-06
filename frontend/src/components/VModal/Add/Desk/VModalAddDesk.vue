<script setup lang="ts">
import type { TDesk } from '@/@types/TDesk'
import { addDesk } from '@/api/Desks.api'
import VButton from '@/components/VButton.vue'
import VField from '@/components/VField/VField.vue'
import { useForm } from 'vee-validate'
import VModal from '../../VModal.vue'

interface IProps {
  isVisible: boolean
}

defineProps<IProps>()

const { handleSubmit } = useForm<{ name: string }>()

const onSubmit = handleSubmit(async (values) => {
  const resp = await addDesk(values.name)
  if (resp) emit('addDesk', resp.data)
  emit('closeModal')
})

const emit = defineEmits<{ (e: 'closeModal'): void; (e: 'addDesk', desk: TDesk): void }>()
</script>
<template>
  <VModal @close-modal="emit('closeModal')" :is-visible="isVisible">
    <form class="modal-desk" @submit="onSubmit">
      <fieldset class="modal-desk__field">
        <legend class="modal-desk__title">Введите название доски:</legend>
        <VField name="name" type="text" />
      </fieldset>
      <VButton type="submit" variant="contained">Создать доску</VButton>
      <VButton @click="$emit('closeModal')" type="button" variant="contained">Отмена</VButton>
    </form>
  </VModal>
</template>

<style lang="scss" scoped>
.modal-desk {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: flex-start;
  height: 100%;
  &__title {
    @include font-h3();
    margin-bottom: 12px;
  }
  &__field {
    max-height: 65px;
  }
}
</style>
