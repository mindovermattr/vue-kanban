<script setup lang="ts">
import { useFlashStore } from '@/store/useFlashStore'
import { onUnmounted, ref } from 'vue'

const flashStore = useFlashStore()
const emit = defineEmits<(e: 'closeFlash') => void>()

const progress = ref(100)

let intervalId = ref<number | undefined>()

const unsubscribe = flashStore.$onAction(() => {
  const time = new Promise<number>((res) => {
    progress.value = 100
    intervalId.value = setInterval(() => {
      progress.value -= 0.1
      if (Math.ceil(progress.value) === 0) {
        res(intervalId.value!)
      }
    }, flashStore.timeInMs / 1000)
  })

  time.then((id) => {
    flashStore.closeFlash()
    clearInterval(id)
    clearInterval(intervalId.value)
  })
}, false)

onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <Teleport to="body">
    <Transition appear name="message">
      <div v-if="flashStore.isOpen" class="flash">
        <div class="flash__content">
          <div class="flash__progress-wrapper" role="progressbar">
            <div
              :style="{
                width: `${progress}%`,
                backgroundColor: flashStore.variant === 'error' ? 'red' : 'blue',
              }"
              class="flash__progress"
            ></div>
          </div>
          <div class="flash__text">
            {{ flashStore.message }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.flash {
  position: relative;
  width: 100%;
  height: 100%;

  &__content {
    position: fixed;
    left: 20px;
    bottom: 20px;
    min-width: 250px;
    max-width: 350px;
    min-height: 80px;
    border-radius: 15px;
    background-color: $white-color;
    overflow: hidden;
  }
  &__progress {
    background-color: $blue-color;
    border-radius: 15px;
    height: 8px;
  }
  &__text {
    @include font-h3();
    padding: 10px;
  }
}

.message-enter-active {
  transition: all 0.3s ease-out;
}

.message-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.message-enter-from,
.message-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
