import { screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import type { Router } from 'vue-router'
import VModal from './VModal.vue'

vi.mock('vue-router', async (origImp) => {
  const orig = (await origImp()) as Router
  return {
    ...orig,
    useRoute: vi.fn(() => ({
      params: {
        id: 1,
      },
    })),
  }
})

describe('Testing modal wrapper component', () => {
  test('Should render with slots', async () => {
    const wrapper = mount(VModal, {
      props: {
        isVisible: true,
      },
      slots: {
        default: '<div data-testid="text">Модалка</div>',
      },
      global: {
        plugins: [setActivePinia(createPinia())],
      },
    })

    expect(screen.queryByTestId('text')?.textContent).toContain('Модалка')
  })
  test('Testing emmits', async () => {
    const wrapper = mount(VModal, {
      props: {
        isVisible: true,
      },
      slots: {
        default: '<button @click="$emit(closeModal)" data-testid="button">Закрыть</button>',
      },
      global: {
        plugins: [setActivePinia(createPinia())],
      },
    })
    wrapper.vm.$emit('closeModal', !wrapper.vm.$props.isVisible)

    wrapper.vm.$emit('closeModal', wrapper.vm.$props.isVisible)

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().closeModal[0]).toEqual([false])
    expect(wrapper.emitted().closeModal[1]).toEqual([true])
  })
})
