import type { Ref } from 'vue'

export const useModal = (ref: Ref<boolean>) => {
  const openModal = () => {
    ref.value = true
  }
  const closeModal = () => {
    ref.value = false
  }
  const toggleModal = () => {
    ref.value = !ref.value
  }

  return { openModal, closeModal, toggleModal }
}
