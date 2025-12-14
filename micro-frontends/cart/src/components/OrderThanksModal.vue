<template>
  <Transition name="fade">
    <div v-if="modelValue" :class="$style.backdrop" @click.self="close">
      <div :class="$style.popup">
        <CloseButton inner-aria-label="Закрыть попап" @close="close" />

        <div :class="$style.popupTitle">
          <TitleComponent size="big" tag="h2">Спасибо за заказ</TitleComponent>
        </div>

        <p :class="$style.text">
          Мы начали готовить Ваш заказ, скоро привезём его вам ;)
        </p>

        <div :class="$style.actions">
          <ButtonComponent type="button" @click="close">
            Отлично, я жду!
          </ButtonComponent>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CloseButton from "@pizza/shared/common/components/CloseButton.vue";
import TitleComponent from "@pizza/shared/common/components/TitleComponent.vue";
import ButtonComponent from "@pizza/shared/common/components/ButtonComponent.vue";

const modelValue = defineModel<boolean>({ default: false });

const emits = defineEmits<{
  close: [];
}>();
function close() {
  modelValue.value = false;
  emits("close");
}
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-colors";

.backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(ds-colors.$black, 0.5);
}

.popup {
  position: relative;
  width: 480px;
  max-width: 90vw;
  padding: 64px 95px;
  border-radius: 12px;
  background-color: ds-colors.$white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 420px;

  &::before,
  &::after {
    position: absolute;
    width: 48px;
    height: 48px;
    content: "";
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;
    background-image: url("/api/public/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;
    background-image: url("/api/public/img/filling/tomatoes.svg");
  }
}

.popupTitle {
  margin-bottom: 12px;
}

.text {
  margin: 24px 0;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
}

.actions button {
  padding: 16px 14px;
}
</style>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
