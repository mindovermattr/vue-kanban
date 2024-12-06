import { createApp } from 'vue'

export function withSetup<T>(composable: () => T) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })
  app.mount(document.createElement('div'))
  return [result, app]
}
