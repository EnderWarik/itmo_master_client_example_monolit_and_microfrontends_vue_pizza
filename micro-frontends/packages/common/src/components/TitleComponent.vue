<template>
  <component :is="tag" :class="[$style.title, $style[size]]">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { TitleSize, TitleTag } from '../types';

const { size = "small", tag = "h2" } = defineProps<{
  size?: TitleSize;
  tag?: TitleTag;
}>();
</script>

<style module lang="scss">
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: #1f2120;
  font-family: 'Roboto', sans-serif;
}

.big {
  font-size: 36px;
  line-height: 42px;
  font-weight: 700;
}

.small {
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
}
</style>
