import { ref } from 'vue'
import { useModal } from '../useModal'

describe('Testing useModal composable', () => {
  test('Should return functions', () => {
    const isVisible = ref(false)

    const modalHandlers = useModal(isVisible)

    expect(Object.entries(modalHandlers).length).toBe(3)
  })
  test('Should open modal', () => {
    const isVisible = ref(false)

    const { openModal } = useModal(isVisible)

    openModal()
    expect(isVisible.value).toBe(true)
  })
  test('Should close modal', () => {
    const isVisible = ref(true)

    const { closeModal } = useModal(isVisible)

    closeModal()
    expect(isVisible.value).toBe(false)
  })
  test('Should toggle modal', () => {
    const isVisible = ref(true)

    const { toggleModal } = useModal(isVisible)

    toggleModal()
    expect(isVisible.value).toBe(false)

    toggleModal()
    expect(isVisible.value).toBe(true)
  })
})
