<template>
  <div :class="$style.result">
    <p>Итого: {{ total.toLocaleString() }} ₽</p>
    <ButtonComponent
      type="button"
      class="button"
      :disabled="disabled"
      @click="emit('submit')"
    >
      {{ buttonText }}
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/common/components/ButtonComponent.vue";

defineProps<{
  total: number;
  disabled?: boolean;
  buttonText?: string;
}>();
const emit = defineEmits<{ submit: [] }>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
.result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include ds-typography.b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
