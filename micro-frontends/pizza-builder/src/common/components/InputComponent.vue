<template>
  <input
    v-bind="$attrs"
    v-model="modelValue"
    :type="type"
    :name="name"
    :min="min"
    :max="max"
    :step="step"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
  />
</template>
<script setup lang="ts">
import { InputType } from "@/common/types";

const modelValue = defineModel<string | number | boolean | null>();

defineProps<{
  type?: InputType;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}>();
</script>
