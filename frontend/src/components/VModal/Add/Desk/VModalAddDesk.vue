<script setup lang="ts">
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
  await addDesk(values.name)
})

const emit = defineEmits<(e: 'closeModal') => void>()
</script>
<template>
  <VModal @close-modal="emit('closeModal')" :is-visible="isVisible">
    <form class="modal-desk" @submit="onSubmit">
      <fieldset>
        <legend class="modal-desk__title">Введите название доски:</legend>
        <VField name="name" type="text" />
      </fieldset>
      <VButton type="submit" variant="contained">Создать доску</VButton>
    </form>
  </VModal>
</template>

<style lang="scss" scoped>
.modal-desk {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  height: 100%;
  &__title {
    @include font-h3();
    margin-bottom: 12px;
  }
}
</style>
