import type { Ref } from 'vue'

export const formatDate = (date: Ref<Date>) =>
  `${date.value?.getDate().toString().padStart(2, '0')}.${(date.value?.getMonth() + 1).toString().padStart(2, '0')}.${date.value?.getFullYear()}`
