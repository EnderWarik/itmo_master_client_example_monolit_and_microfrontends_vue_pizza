<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import HeaderContainer from "@/modules/header/HeaderContainer.vue";
import SidebarNav from "@/common/components/SidebarNav.vue";

const route = useRoute();

const title = computed(() => route.meta.title as string | undefined);
const links = computed(
  () => (route.meta.links as { label: string; href: string }[]) ?? [],
);
</script>

<template>
  <div>
    <HeaderContainer />
    <SidebarNav :width="180" :links="links" />
    <div :class="$style.content">
      <div v-if="title" :class="$style.title">
        <h1>{{ title }}</h1>
      </div>
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
.content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}
.title {
  margin-bottom: 27px;
}
</style>
