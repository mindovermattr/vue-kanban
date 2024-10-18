<script setup lang="ts">
import { onBeforeUpdate, onUpdated, ref } from 'vue'

interface IProps {
  min?: number
  max?: number
  isVisible: boolean
  value: number
  timeInMs: number
}

const props = defineProps<IProps>()
const emit = defineEmits<(e: 'setClose') => void>()
const progress = ref(100)
let intervalId: number | undefined
let timeOutID: number | undefined
onBeforeUpdate(() => {
  progress.value = 100
  if (timeOutID) {
    clearTimeout(timeOutID)
    timeOutID = undefined
  } else {
    timeOutID = setTimeout(() => {
      emit('setClose')
      clearInterval(intervalId)
    }, props.timeInMs + 100)
  }
})

onUpdated(() => {
  if (intervalId) {
    intervalId = undefined
  } else {
    intervalId = setInterval(() => {
      progress.value -= 1
    }, props.timeInMs / 100)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="message">
      <div v-if="isVisible" class="flash">
        <div class="flash__content">
          <div
            class="flash__progress-wrapper"
            role="progressbar"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :aria-valuenow="value"
          >
            <div :style="{ width: `${progress}%` }" class="flash__progress"></div>
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
    min-width: 150px;
    min-height: 80px;
    background-color: $white-color;

    border-radius: 10px;
  }
  &__progress {
    background-color: $blue-color;
    border-radius: 10px;
    height: 10px;
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
