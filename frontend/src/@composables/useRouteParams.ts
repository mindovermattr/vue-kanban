import { reactive } from 'vue'
import { useRoute } from 'vue-router'

type TRouteParams = Record<string, string>

export const useRouteParams = <T extends keyof TRouteParams>(...params: T[]) => {
  const route = useRoute()
  const result = reactive<Record<T, string>>({} as Record<T, string>)
  params.forEach((el) => {
    result[el] = route.params[el] as string
  })
  return result
}
