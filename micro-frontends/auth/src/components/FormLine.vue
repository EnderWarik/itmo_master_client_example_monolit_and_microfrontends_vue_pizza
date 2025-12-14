<template>
  <div :class="$style.row">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style module lang="scss">
.row {
  margin-bottom: 16px;
}
</style>
