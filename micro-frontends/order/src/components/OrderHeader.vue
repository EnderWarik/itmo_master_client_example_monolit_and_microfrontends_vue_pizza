<template>
  <div :class="$style.header">
    <div :class="$style.number">
      <b>Заказ #{{ orderNumber }}</b>
    </div>

    <div :class="$style.sum">
      <span>Сумма заказа: {{ total.toLocaleString() }} ₽</span>
    </div>

    <div :class="$style.actions">
      <ButtonComponent
        type="button"
        :class="[$style.btn, $style.btnBorder]"
        @click="emits('delete')"
      >
        Удалить
      </ButtonComponent>
      <ButtonComponent
        type="button"
        :class="$style.btn"
        @click="emits('repeat')"
      >
        Повторить
      </ButtonComponent>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonComponent from "@pizza/shared/common/components/ButtonComponent.vue";

defineProps<{
  orderNumber: string | number;
  total: number;
}>();

const emits = defineEmits<{
  delete: [];
  repeat: [];
}>();
</script>
<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.header {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  b,
  span {
    @include ds-typography.b-s14-h16;
  }
}

.number {
  margin-right: auto;
}
.sum {
  margin-right: 16px;
}

.actions {
  display: flex;
  gap: 16px;
}

.btn {
  padding: 8px 26px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: ds-colors.$green-500;
  color: ds-colors.$white;
  cursor: pointer;
}

.btnBorder {
  background: transparent;
  color: inherit;
  border-color: rgba(ds-colors.$green-500, 0.4);
}
</style>
