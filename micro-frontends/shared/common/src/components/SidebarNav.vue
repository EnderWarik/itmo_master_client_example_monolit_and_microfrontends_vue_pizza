<template>
  <aside
    :class="$style.sidebar"
    :style="{ width: width + 'px', top: top + 'px' }"
  >
    <nav :class="$style.nav">
      <RouterLink
        v-for="l in links"
        :key="l.href + l.label"
        :to="l.href"
        :class="[$style.link, currentPath === l.href && $style.active]"
      >
        {{ l.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const currentPath = computed(() => route.path);

const {
  width = 180,
  top = 61,
  links = [],
} = defineProps<{
  width?: number;
  top?: number;
  links?: { label: string; href: string }[];
}>();
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.sidebar {
  position: static;
  background-color: rgba(ds-colors.$green-500, 0.05);
}

.nav {
  display: grid;
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
