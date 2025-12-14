<script setup lang="ts">
import ButtonComponent from "@pizza/shared/common/components/ButtonComponent.vue";

defineProps<{
  total: number;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  more: [];
  submit: [];
}>();
</script>

<template>
  <section :class="$style.footer">
    <div :class="$style.more">
      <ButtonComponent
        type="button"
        variant="border"
        :class="[$style.moreButton, $style.moreButtonArrow]"
        @click="emits('more')"
      >
        Хочу еще одну
      </ButtonComponent>
    </div>

    <p :class="$style.text">
      Перейти к конструктору<br />
      чтоб собрать ещё одну пиццу
    </p>

    <div :class="$style.price">
      <b>Итого: {{ total.toLocaleString() }} ₽</b>
    </div>

    <div :class="$style.submit">
      <ButtonComponent
        type="submit"
        :disabled="disabled"
        @click="emits('submit')"
      >
        Оформить заказ
      </ButtonComponent>
    </div>
  </section>
</template>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";
@use "@pizza/shared/assets/scss/ds-system/ds-typography";

.footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 25px 2.12%;
  background-color: rgba(ds-colors.$green-500, 0.1);
}

.more {
  width: 220px;
  margin-right: 16px;
}
.moreButton {
  padding: 16px 40px;
}

.moreButtonArrow {
  position: relative;
}
.moreButtonArrow::before {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 18px;
  height: 18px;
  content: "";
  background: url("@pizza/shared/assets/img/button-arrow.svg") no-repeat center;
  background-size: contain;
  transform: translateY(-50%);
}

.text {
  @include ds-typography.l-s11-h13;
  color: rgba(ds-colors.$black, 0.5);
}

.price {
  @include ds-typography.b-s24-h28;
  margin-right: 12px;
  margin-left: auto;
}

.submit button {
  padding: 16px 14px;
}
</style>
