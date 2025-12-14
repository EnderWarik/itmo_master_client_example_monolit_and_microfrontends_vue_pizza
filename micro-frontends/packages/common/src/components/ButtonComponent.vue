<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[$style.button, $style[variant], arrow && $style.arrow]"
    v-bind="$attrs"
    @click="emits('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const {
  type = "button",
  disabled = false,
  variant = "solid",
  arrow = false,
} = defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "solid" | "border" | "transparent" | "white";
  arrow?: boolean;
}>();

const emits = defineEmits<{
  click: [value: PointerEvent];
}>();
</script>

<style module lang="scss">
$green-500: #00be23;
$green-600: #00861a;
$white: #fff;
$black: #1f2120;
$shadow-light: 0 4px 8px rgba(0, 0, 0, 0.1);

.button {
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  display: block;
  box-sizing: border-box;
  min-width: 140px;
  padding: 14px 20px;
  text-align: center;
  border: none;
  outline: none;
  color: $white;
  cursor: pointer;
  background-color: $green-500;
  box-shadow: $shadow-light;
  transition: 0.3s;

  &:hover:not(:disabled) {
    background-color: $green-600;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
}

.border {
  color: $green-500;
  background-color: transparent;
  border: 1px solid $green-500;
  box-shadow: none;

  &:hover:not(:disabled) {
    color: $white;
    background-color: $green-500;
  }
}

.transparent {
  color: $green-500;
  background-color: transparent;
  box-shadow: none;

  &:hover:not(:disabled) {
    background-color: rgba($green-500, 0.1);
  }
}

.white {
  color: $green-500;
  background-color: $white;

  &:hover:not(:disabled) {
    background-color: rgba($white, 0.9);
  }
}

.arrow {
  &::after {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 8px;
    content: "";
    vertical-align: middle;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'/%3E%3C/svg%3E") no-repeat center;
    background-size: contain;
  }
}
</style>
