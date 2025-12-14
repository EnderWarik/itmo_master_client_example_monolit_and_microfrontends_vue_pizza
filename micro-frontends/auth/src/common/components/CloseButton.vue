<template>
  <ButtonComponent
    :class="[
      $style.close,
      {
        [$style.white]: !!white,
      },
    ]"
    type="button"
    :aria-label="innerAriaLabel"
    @click="emits('close')"
  />
</template>

<script setup lang="ts">
import ButtonComponent from "@/common/components/ButtonComponent.vue";

defineProps<{
  white?: boolean;
  innerAriaLabel: string;
}>();
const emits = defineEmits<{ close: [] }>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";

.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  color: ds-colors.$black;
  border: 0;
  border-radius: 50%;
  outline: none;
  background: transparent;
}

.close::before,
.close::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 2px;
  content: "";
  border-radius: 2px;
  background-color: ds-colors.$black;
  transform-origin: center;
}

.close::before {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.close::after {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close:hover {
  opacity: 0.8;
}
.close:active {
  opacity: 0.5;
}
.close:focus::before,
.close:focus::after {
  background-color: ds-colors.$orange-100;
}

.white::before,
.white::after {
  background-color: ds-colors.$white;
}
</style>
