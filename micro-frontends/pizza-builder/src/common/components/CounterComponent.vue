<template>
  <div :class="[$style.counter, color === 'orange' && $style.orange]">
    <ButtonComponent
      type="button"
      :class="[$style.btn, $style.minus]"
      :disabled="modelValue <= min"
      @click="decrement"
    >
      <span class="visually-hidden">Меньше</span>
    </ButtonComponent>

    <InputComponent
      v-model="modelValue"
      :class="$style.input"
      :disabled="true"
      type="text"
      name="counter"
    />

    <ButtonComponent
      type="button"
      :class="[$style.btn, $style.plus]"
      :disabled="modelValue >= max"
      @click="increment"
    >
      <span class="visually-hidden">Больше</span>
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/common/components/ButtonComponent.vue";
import InputComponent from "@/common/components/InputComponent.vue";

const modelValue = defineModel<number>({ default: 0 });

const {
  min = 0,
  max = Infinity,
  color = "default",
} = defineProps<{
  min?: number;
  max?: number;
  color?: "default" | "orange";
}>();

function increment() {
  if (modelValue.value < max) modelValue.value++;
}
function decrement() {
  if (modelValue.value > min) modelValue.value--;
}
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input {
  @include ds-typography.r-s14-h16;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: ds-colors.$black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset ds-shadows.$shadow-regular;
  }
}

.btn {
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
}

.minus {
  background-color: ds-colors.$purple-100;

  &::before {
    @include m_center.p_center-all;
    width: 50%;
    height: 2px;
    content: "";
    border-radius: 2px;
    background-color: ds-colors.$black;
  }

  &:hover:not(:active):not(:disabled) {
    background-color: ds-colors.$purple-200;
  }
  &:active:not(:disabled) {
    background-color: ds-colors.$purple-300;
  }
  &:focus:not(:disabled) {
    box-shadow: ds-shadows.$shadow-regular;
  }

  &:disabled {
    cursor: default;
    &::before {
      opacity: 0.1;
    }
  }
}

.plus {
  background-color: ds-colors.$green-500;

  &::before,
  &::after {
    @include m_center.p_center-all;
    width: 50%;
    height: 2px;
    content: "";
    border-radius: 2px;
    background-color: ds-colors.$white;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  &:hover:not(:active):not(:disabled) {
    background-color: ds-colors.$green-400;
  }
  &:active:not(:disabled) {
    background-color: ds-colors.$green-600;
  }
  &:focus:not(:disabled) {
    box-shadow: ds-shadows.$shadow-regular;
  }
  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
}

.orange {
  .plus {
    background-color: ds-colors.$orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: ds-colors.$orange-100;
    }
    &:active:not(:disabled) {
      background-color: ds-colors.$orange-300;
    }

    &::before,
    &::after {
      background-color: ds-colors.$white;
    }
  }
}
</style>
