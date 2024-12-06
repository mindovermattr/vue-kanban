import { ref } from 'vue'
import { useModal } from '../useModal'

describe('Testing useModal composable', () => {
  test('Should return functions', () => {
    const isVisible = ref(false)

    const modalHandlers = useModal(isVisible)

    expect(Object.entries(modalHandlers).length).toBe(3)
  })
})
