<template>
  <section :class="$style.sheet">
    <div v-if="$slots.title || title" :class="$style.title">
      <TitleComponent :size="titleSize" :tag="titleTag">
        <slot name="title">{{ title }}</slot>
      </TitleComponent>
    </div>

    <div v-if="$slots.default" :class="[$style.content]">
      <slot />
    </div>
    <slot name="no-content" />
  </section>
</template>

<script setup lang="ts">
import { TitleSize, TitleTag } from "@/common/types";
import TitleComponent from "@/common/components/TitleComponent.vue";

defineProps<{
  title?: string;
  titleSize?: TitleSize;
  titleTag?: TitleTag;
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";

.sheet {
  border-radius: 8px;
  background-color: ds-colors.$white;
  box-shadow: ds-shadows.$shadow-light;
}

.title {
  padding-right: 18px;
  padding-left: 18px;
}

.content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding: 18px 18px 0;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}
</style>
