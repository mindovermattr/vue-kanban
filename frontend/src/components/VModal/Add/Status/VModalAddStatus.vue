<script setup lang="ts">
import VField from '@/components/VField/VField.vue'
import { ErrorMessage, useForm } from 'vee-validate'
import { object, string } from 'yup'
import VModal from '../../VModal.vue'

interface IProps {
  isVisible: boolean
}
defineProps<IProps>()

const validationSchema = object({
  name: string().required(),
})
const { handleSubmit, errors } = useForm<{ name: string }>({
  validationSchema: validationSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>
<template>
  <VModal :is-visible="isVisible">
    <form @submit="onSubmit">
      <VField name="name" type="text" :isError="!!errors.name" />
      <ErrorMessage name="name">фыфыв</ErrorMessage>
    </form>
  </VModal>
</template>

<style lang="scss" scoped></style>
