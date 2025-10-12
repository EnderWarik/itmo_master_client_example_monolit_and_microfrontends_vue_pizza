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
    <div :class="$style.main">
      <SidebarNav :width="180" :links="links" />
      <div :class="$style.content">
        <div v-if="title" :class="$style.title">
          <h1>{{ title }}</h1>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.main {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.content {
  flex: 1 1 auto;
  padding-top: 22px;
  padding-right: 2.12%;
}
.title {
  margin-bottom: 27px;
}
</style>
