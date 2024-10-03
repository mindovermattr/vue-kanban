<script setup lang="ts">
const emit = defineEmits<(e: 'closeModal') => void>()
</script>

<template>
  <div class="modal-wrapper" @click="emit('closeModal')">
    <div class="modal">
      <slot> </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 40px 30px;
  background-color: $bg-white-color;
  transform: translate(-50%, -50%);
  width: 630px;

  &-wrapper {
    position: absolute;
    width: calc((#{100vw}) - 18px);
    height: 100vh;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
