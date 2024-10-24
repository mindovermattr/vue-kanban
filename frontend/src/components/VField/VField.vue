<script setup lang="ts">
import { Field } from 'vee-validate'
import type { InputTypeHTMLAttribute } from 'vue'

interface IProps {
  name: string
  type: InputTypeHTMLAttribute
  isError?: boolean
  placeholder?: string
}

defineProps<IProps>()
</script>
<template>
  <Field
    :name="name"
    :type="type"
    :class="[
      'form__input',
      {
        'form__input--error': isError,
      },
    ]"
    :placeholder="placeholder"
  />
</template>

<style lang="scss" scoped>
.form {
  &__input {
    padding: 5px 0px 5px 10px;
    width: 100%;
    color: $gray-color-100;
    font-size: 1.75rem;
    line-height: 150%;
    border: 0.7px solid $gray-color-40;
    border-radius: 8px;

    &--error {
      border-color: $error-color;
    }
  }
}
</style>
