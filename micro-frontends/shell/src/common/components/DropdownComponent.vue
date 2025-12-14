<template>
  <select
    v-model="modelValue"
    :name="name"
    :disabled="disabled"
    :class="$style.select"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>
<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });

defineProps<{
  name: string;
  options: { value: string; text: string }[];
  disabled?: boolean;
}>();
</script>
<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";

.select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(ds-colors.$green-500, 0.2);
  border-radius: 8px;
  outline: none;
  background-color: ds-colors.$white;
  transition: 0.3s;

  &:focus {
    border-color: ds-colors.$green-500;
  }

  &:disabled {
    background-color: ds-colors.$silver-200;
    color: rgba(ds-colors.$black, 0.5);
  }
}
</style>
