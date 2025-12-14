<template>
  <button
    type="button"
    :class="[$style.close, white && $style.white]"
    :aria-label="innerAriaLabel"
    @click="emits('close')"
  >
    <span :class="$style.icon"></span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  innerAriaLabel?: string;
  white?: boolean;
}>();

const emits = defineEmits<{
  close: [];
}>();
</script>

<style module lang="scss">
$black: #1f2120;
$white: #fff;

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
}

.icon {
  display: block;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231f2120'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
}

.white .icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
}
</style>
