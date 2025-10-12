<template>
  <div :class="[$style.row, small && $style.small]">
    <TextInput
      v-model="modelValue"
      :name="name"
      :readonly="readonly"
      :placeholder="placeholder"
    >
      <span>{{ label }}</span>
    </TextInput>
    <p v-if="error" :class="$style.error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/common/components/TextInput.vue";

const modelValue = defineModel<string>({ default: "" });

defineProps<{
  name: string;
  label: string;
  small?: boolean;
  readonly?: boolean;
  placeholder?: string;
  error?: string | null;
}>();
</script>

<style module lang="scss">
.row {
  position: relative;
  flex-grow: 1;
  padding-bottom: 18px; /* reserve space for error line */
  margin-bottom: 20px;
}
.small {
  max-width: 120px;
}
.error {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  color: #ffaf37; /* matches ds-colors.$orange-100 */
}
</style>
