import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import type { Axios } from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { vi } from 'vitest'
import VKanbanCard from './VKanbanCard.vue'

vi.mock('axios', async (importOrig) => {
  const orig = (await importOrig()) as Axios
  return {
    ...orig,
    create: vi.fn(() => ({
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
      },
    })),
  }
})

describe('Testing card', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Should render', () => {
    const wrapper = shallowMount(VKanbanCard, {
      props: {
        category: {
          accent_color: '#fff',
          desk_id: 1,
          id: 1,
          main_color: '#000',
          name: 'k',
        },
        body: 'asd',
        id: 1,
        period: '2024-11-19',
        status_id: 1,
        user_id: 1,
        name: 'name',
      },
      global: {
        provide: {
          isDragging: {
            id: 1,
            isHided: false,
            value: false,
          },
        },
        plugins: [
          createTestingPinia({
            initialState: {
              status: {
                status: [
                  {
                    name: 'asd',
                    id: 1,
                  },
                ],
              },
              cards: {
                id: 1,
                body: 'asd',
              },
            },
          }),
        ],
      },
    })
    expect(wrapper.text())
  })
})
