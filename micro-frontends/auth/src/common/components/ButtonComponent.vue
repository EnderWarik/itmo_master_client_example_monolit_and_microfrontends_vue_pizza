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
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";

.button {
  @include ds-typography.b-s18-h21;
  font-family: inherit;
  display: block;
  box-sizing: border-box;

  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  border: none;
  border-radius: 8px;
  outline: none;
}

.solid {
  color: ds-colors.$white;
  background-color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-medium;

  &:hover:not(:active):not(:disabled) {
    background-color: ds-colors.$green-400;
  }
  &:active:not(:disabled) {
    background-color: ds-colors.$green-600;
  }
  &:focus:not(:disabled) {
    opacity: 0.5;
  }
  &:disabled {
    //background-color: ds-colors.$green-300;
    color: rgba(ds-colors.$white, 0.2);
    cursor: default;
  }
}

.border {
  background-color: transparent;
  color: ds-colors.$black;
  border: 1px solid ds-colors.$green-500;
  box-shadow: none;

  &:hover:not(:active):not(:disabled) {
    color: ds-colors.$green-500;
    border-color: ds-colors.$green-500;
    background-color: transparent;
  }
  &:active:not(:disabled) {
    color: ds-colors.$green-600;
    border-color: ds-colors.$green-600;
    background-color: transparent;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.transparent {
  @include ds-typography.b-s14-h16;
  background-color: transparent;
  color: ds-colors.$black;
  box-shadow: none;
  border: none;

  &:hover:not(:active):not(:disabled) {
    color: ds-colors.$red-800;
    background-color: transparent;
  }
  &:active:not(:disabled) {
    color: ds-colors.$red-900;
    background-color: transparent;
  }
  &:disabled {
    opacity: 0.25;
    cursor: default;
  }
}

.white {
  background-color: ds-colors.$white;
  color: ds-colors.$green-500;
  box-shadow: ds-shadows.$shadow-medium;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}

.arrow {
  &::before {
    content: "";
    background-image: url("@/assets/img/button-arrow.svg");
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 16px;
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    transform: translateY(-1px);
  }
}
</style>
