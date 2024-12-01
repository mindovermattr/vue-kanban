<script setup lang="ts"></script>
<template>
  <slot name="header"></slot>
  <main :class="['main', $attrs.class]">
    <slot> </slot>
  </main>
  <slot name="modal"></slot>
</template>

<style lang="scss" scoped>
.main {
  background-color: $bg-gray-color;
  min-height: calc(100vh - 77px);
}
</style>
