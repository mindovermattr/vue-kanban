<script setup lang="ts">
import VButton from '@/components/VButton.vue'
import VField from '@/components/VField/VField.vue'
import { useCardStore } from '@/store/useCardsStore'
import { useStatusStore } from '@/store/useStatusStore'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { object, string } from 'yup'
import VModal from '../../VModal.vue'

interface IProps {
  isVisible: boolean
}
defineProps<IProps>()

const statusStore = useStatusStore()
const cardStore = useCardStore()
const route = useRoute()

const emit = defineEmits<(e: 'closeModal') => void>()

const validationSchema = object({
  name: string().required(),
})
const { handleSubmit, errors } = useForm<{ name: string }>({
  validationSchema: validationSchema,
})

const onSubmit = handleSubmit(async (values) => {
  await statusStore.addStatus(+route.params.id, values)
  if (statusStore.status.length === 1) await cardStore.fetchCards(+route.params.id)
  emit('closeModal')
})
</script>
<template>
  <VModal @close-modal="emit('closeModal')" :is-visible="isVisible">
    <form @submit="onSubmit">
      <fieldset class="modal__field">
        <legend class="modal__title">Введите имя колонки</legend>
        <VField name="name" type="text" :isError="!!errors.name" />
        <VButton type="submit" variant="contained">Создать статус</VButton>
        <VButton type="button" @click="$emit('closeModal')" variant="contained">Закрыть</VButton>
      </fieldset>
    </form>
  </VModal>
</template>

<style lang="scss" scoped>
.modal {
  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__title {
    @include font-h3();
    margin-bottom: 8px;
  }
}
</style>
