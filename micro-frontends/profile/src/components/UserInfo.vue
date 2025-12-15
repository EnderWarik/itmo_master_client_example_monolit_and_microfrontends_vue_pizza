<template>
  <div :class="$style.user">
    <picture v-if="typeof avatar === 'object'">
      <source type="image/webp" :srcset="toSrcset(avatar.webp)" />
      <img
        :src="avatar.jpg.x1"
        :srcset="toSrcset(avatar.jpg)"
        :alt="name"
        :width="size"
        :height="size"
      />
    </picture>
    <img v-else :src="fixPath(avatar)" :alt="name" :width="size" :height="size" />

    <div :class="$style.name">
      <span>{{ name }}</span>
      <slot name="after-name" />
    </div>

    <p v-if="phone" :class="$style.phone">
      <slot name="phone-label">Контактный телефон:</slot>
      <span>{{ phone }}</span>
    </p>
  </div>
</template>
<script setup lang="ts">
type Avatar = {
  webp: { x1: string; x2?: string };
  jpg: { x1: string; x2?: string };
};

const { size = 72, avatar } = defineProps<{
  name: string;
  phone?: string;
  avatar?: Avatar | string;
  size?: number;
}>();

function toSrcset(pair?: Record<string, string>) {
  if (!pair) return "";
  return Object.entries(pair)
    .map(([key, url]) => {
      const density = key.startsWith("x") ? key.slice(1) : "";
      return density ? `${url} ${density}x` : url;
    })
    .join(", ");
}

// Fix avatar path - strip /public prefix if present
function fixPath(path?: string) {
  if (!path) return "";
  return path.replace(/^\/public/, '');
}
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";
@use "@pizza/shared/assets/scss/ds-system/ds-colors";

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 33px;

  picture {
    border-radius: 50%;
    overflow: hidden;
  }
}

.name {
  @include ds-typography.b-s20-h23;
  margin-left: 30px;

  span {
    display: inline-block;
    vertical-align: middle;
  }
}

.phone {
  @include ds-typography.b-s16-h19;
  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
