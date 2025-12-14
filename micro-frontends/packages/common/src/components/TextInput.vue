<template>
  <label :class="$style.input">
    <span :class="$style.label"><slot /></span>
    <input
      v-model="model"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :class="$style.field"
    />
  </label>
</template>

<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  name: string;
  type?: string;
  placeholder?: string;
}>();
</script>

<style module lang="scss">
$black: #1f2120;
$gray-050: #f4f4f7;
$gray-200: #b7b7b7;

.input {
  display: block;
  cursor: pointer;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  font-family: 'Roboto', sans-serif;
}

.field {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  font-size: 14px;
  line-height: 16px;
  font-family: 'Roboto', sans-serif;
  color: $black;
  background-color: $gray-050;
  border: 1px solid transparent;
  outline: none;
  transition: 0.3s;

  &::placeholder {
    color: $gray-200;
  }

  &:focus {
    border-color: $gray-200;
  }
}
</style>
