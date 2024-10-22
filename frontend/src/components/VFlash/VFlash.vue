<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref } from 'vue'

interface IProps {
  isVisible: boolean
  timeInMs?: number
  top?: string
  right?: string
  left?: string
  bottom?: string
  color?: string
}

const { timeInMs = 1500 } = defineProps<IProps>()
const emit = defineEmits<(e: 'setClose') => void>()
const progress = ref(100)

let intervalId: number | undefined
let timeOutID: number | undefined

const time = new Promise<number>((res) => {
  progress.value = 100

  intervalId = setInterval(() => {
    progress.value -= 0.1
    if (Math.ceil(progress.value) === 0) {
      res(intervalId!)
    }
  }, timeInMs / 1000)
})

onMounted(() => {
  time.then((id) => {
    clearInterval(id)
    emit('setClose')
  })
})

onBeforeUpdate(() => {
  if (timeOutID) {
    clearTimeout(timeOutID)
    timeOutID = undefined
  }
  if (intervalId) {
    intervalId = undefined
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition appear name="message">
      <div v-if="isVisible" class="flash">
        <div :style="{ left: left, top: top, right: right, bottom: bottom }" class="flash__content">
          <div class="flash__progress-wrapper" role="progressbar">
            <div
              :style="{ width: `${progress}%`, backgroundColor: color }"
              class="flash__progress"
            ></div>
          </div>
          <div class="flash__text">
            <slot></slot>
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
    position: absolute;
    left: 20px;
    bottom: 20px;
    min-width: 250px;
    max-width: 350px;
    min-height: 80px;
    background-color: $white-color;
  }
  &__progress {
    background-color: $blue-color;
    height: 6px;
    &--wrapper {
      width: 100%;
      height: 20px;
    }
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
