import router from '@/router'
import { flushPromises, mount } from '@vue/test-utils'
import { useRouter, type Router } from 'vue-router'
import VDesk from './VDesk.vue'

vi.mock('vue-router', async (origImp) => {
  const orig = (await origImp()) as Router
  return {
    ...orig,
    useRoute: vi.fn(() => ({
      params: {
        id: 1,
        desk_id: 3,
        hash: 'code',
      },
    })),
    useRouter: vi.fn(),
  }
})

const mockRouter = {
  push: vi.fn(),
}

describe('Test VDesk component', () => {
  test('Should render', async () => {
    const wrapper = mount(VDesk, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [router],
      },
      props: {
        categories: [
          {
            accent_color: '#Fff',
            name: '',
            id: 0,
            main_color: '',
            desk_id: 0,
          },
        ],
        id: 1,
        index: 1,
        name: 'Name',
        statuses: [
          { id: 1, name: 'Status1' },
          { id: 2, name: 'Status2' },
          { id: 3, name: 'Status3' },
        ],
        tasks: [
          {
            id: 1,
            name: 'Task1',
            period: '2024-13-22',
            body: 'body',
            status_id: 1,
          },
        ],
        username: 'Admin',
      },
    })
    wrapper.find('a').trigger('click')
    await flushPromises()
    console.log(wrapper.html())
    expect(useRouter).null
  })
})
