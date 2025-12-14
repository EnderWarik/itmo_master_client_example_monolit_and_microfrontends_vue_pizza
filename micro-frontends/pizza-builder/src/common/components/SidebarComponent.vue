<template>
  <div :class="$style.root">
    <a :href="links[0]?.href || '#'" :class="$style.logo">
      <img
        :src="logoSrc"
        :alt="logoAlt || 'Logo'"
        :width="logoWidth ?? 90"
        :height="logoHeight ?? 40"
      />
    </a>

    <nav :class="$style.nav">
      <a
        v-for="l in links"
        :key="l.href + l.label"
        :href="l.href"
        :class="[$style.link, l.active && $style.active]"
      >
        {{ l.label }}
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logoSrc: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  links: { label: string; href: string; active?: boolean }[];
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.root {
  display: block;
}

.logo {
  display: block;
  margin-bottom: 30px;
  padding: 10px 0;
  background-color: ds-colors.$green-500;

  img {
    display: block;
    margin: 0 auto;
  }
}

.nav {
  display: grid;
  gap: 0;
}

.link {
  @include ds-typography.b-s14-h16;
  display: block;
  padding: 8px 14px;
  color: ds-colors.$black;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }
  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}

.active {
  background-color: rgba(ds-colors.$green-500, 0.1);
}
</style>
