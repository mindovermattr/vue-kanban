<script lang="ts" setup></script>

<template>
  <div class="skeleton__item"></div>
</template>

<style lang="scss" scoped>
.skeleton__item {
  background: linear-gradient(
    90deg,
    rgb(193, 205, 220) 0,
    rgb(233, 238, 247) 40px,
    rgb(193, 205, 220) 80px
  );
  background-size: 600px;
  animation: skeleton 2s linear infinite;
}

@keyframes skeleton {
  0% {
    background-position: -100px;
  }
  50%,
  100% {
    background-position: 340px;
  }
}
</style>
