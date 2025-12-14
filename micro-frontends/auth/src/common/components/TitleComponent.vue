<template>
  <component :is="tag" :class="[$style.title, $style[size]]">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { TitleSize, TitleTag } from "@/common/types";

const { size = "small", tag = "h2" } = defineProps<{
  size?: TitleSize;
  tag?: TitleTag;
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/ds-system/ds-colors";

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: ds-colors.$black;
}

.big {
  @include ds-typography.b-s36-h42;
}

.small {
  @include ds-typography.b-s18-h21;
}
</style>
