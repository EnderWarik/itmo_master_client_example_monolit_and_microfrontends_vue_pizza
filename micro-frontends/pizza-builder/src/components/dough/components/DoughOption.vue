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
    <b>{{ title }}</b>
    <span>{{ description }}</span>
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
  description: string;
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

.option {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;

  b {
    @include ds-typography.r-s16-h19;

    &::before {
      @include m_center.p_center-v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include ds-typography.l-s11-h13;
    display: block;
  }

  &:hover {
    b::before {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }
}

.checked b::before {
  box-shadow: ds-shadows.$shadow-large;
}

.small b::before {
  background-image: url("@/assets/img/dough-light.svg");
}

.big b::before {
  background-image: url("@/assets/img/dough-large.svg");
}
</style>
