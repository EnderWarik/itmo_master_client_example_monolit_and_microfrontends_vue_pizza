<template>
  <label :class="$style.radio">
    <InputComponent
      v-model="modelValue"
      :class="$style.input"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
    />

    <span :class="$style.text">
      <slot />
    </span>
  </label>
</template>
<script setup lang="ts">
import InputComponent from "@/common/components/InputComponent.vue";

const modelValue = defineModel<boolean | string | number | null>({
  default: false,
});

defineProps<{
  name: string;
  value: string | number | boolean | null;
  disabled?: boolean;
}>();
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";
@use "@/assets/scss/ds-system/ds-shadows";

.radio {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.input {
  display: none;

  &:checked + .text::before {
    box-shadow: ds-shadows.$shadow-large;
  }
}

.text {
  @include ds-typography.r-s16-h19;
  position: relative;
  padding-left: 28px;

  &::before {
    @include m_center.p_center-v;
    display: block;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    content: "";
    transition: 0.3s;
    border: 1px solid ds-colors.$purple-400;
    border-radius: 50%;
    background-color: ds-colors.$white;
  }
}

.radio:hover .input:not(:checked):not(:disabled) + .text::before {
  border-color: ds-colors.$purple-800;
}

.input:checked + .text::before {
  border: 6px solid ds-colors.$green-500;
}

.input:disabled + .text::before {
  border-color: ds-colors.$purple-400;
  background-color: ds-colors.$silver-200;
}

.input:disabled:checked + .text::before {
  border: 6px solid ds-colors.$purple-400;
}
</style>
