<template>
  <label
    :class="[
      $style.option,
      $style[modifier],
      { [$style.checked]: modelValue === value },
    ]"
  >
    <RadioComponent
      v-model="modelValue"
      class="visually-hidden"
      :value="value"
      :name="name"
    />
    <span>{{ title }}</span>
  </label>
</template>

<script setup lang="ts">
import RadioComponent from "@/common/components/RadioComponent.vue";

const modelValue = defineModel<boolean | number | string | null>({
  default: false,
});

defineProps<{
  modifier: string;
  title: string;
  name: string;
  value: string | number | boolean;
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_center";

.option {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;

  span {
    @include ds-typography.r-s16-h19;
    position: relative;
    padding-left: 46px;

    &::before {
      @include m_center.p_center_v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-color: ds-colors.$green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &:hover span::before {
    box-shadow: ds-shadows.$shadow-regular;
  }
}

.small span::before {
  background-size: 18px;
}

.normal span::before {
  background-size: 29px;
}

.big span::before {
  background-size: 100%;
}

.checked span::before {
  box-shadow: ds-shadows.$shadow-large;
}
</style>
