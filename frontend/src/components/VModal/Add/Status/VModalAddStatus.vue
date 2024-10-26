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
  const resp = await statusStore.addStatus(+route.params.id, values)
  if (statusStore.status.length === 1) await cardStore.fetchCards(+route.params.id)
  emit('closeModal')
})
</script>
<template>
  <VModal :is-visible="isVisible">
    <form @submit="onSubmit">
      <VField name="name" type="text" :isError="!!errors.name" />
      <VButton type="submit" variant="contained">Создать статус</VButton>
    </form>
  </VModal>
</template>

<style lang="scss" scoped></style>
