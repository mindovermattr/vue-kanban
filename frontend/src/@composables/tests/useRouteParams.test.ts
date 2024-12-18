import type { Router } from 'vue-router'
import { useRouteParams } from '../useRouteParams'

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
  }
})

describe('Test composable useRouteParams', () => {
  test('should return params', () => {
    const params = useRouteParams('id', 'desk_id', 'hash')

    expect(params.id).toBe(1)
    expect(params.desk_id).toBe(3)
    expect(params.hash).toBe('code')
  })
  test('If param doesnt exist in router undefined', () => {
    const params = useRouteParams('id', 'a')

    expect(params.id).toBe(1)
    expect(params.a).undefined
  })
})
