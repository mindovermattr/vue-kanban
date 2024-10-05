<script setup lang="ts">
interface IProps {
  isVisible: boolean
}

defineProps<IProps>()
const emit = defineEmits<(e: 'closeModal') => void>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="modal-wrapper" @click="emit('closeModal')">
        <div class="modal">
          <slot> </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 40px 30px;
  background-color: $bg-white-color;
  transform: translate(-50%, -50%);
  max-width: 630px;

  &-wrapper {
    position: fixed;
    width: calc((#{100vw}) - 18px);
    height: 100vh;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .modal,
.fade-leave-active .modal {
  transition: all 0.5s ease;
}

.fade-enter-from .modal,
.fade-leave-to .modal {
  opacity: 0;
  transform: translate(-50%, -60%) scale(1);
}
</style>
