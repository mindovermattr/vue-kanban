import { computed, ref } from 'vue'

export const useMobile = () => {
  const width = ref(window.innerWidth)

  const isMobile = computed(() => {
    return width.value <= 540 ? true : false
  })

  return {
    isMobile,
  }
}
