<template>
  <div :class="$style.main">
    <!-- Sidebar -->
    <SidebarNav :width="180" :links="links" />
    
    <!-- Content -->
    <div :class="$style.content">
      <div :class="$style.title">
        <h1>Мои данные</h1>
      </div>
      <ProfileContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileContainer from "@/components/ProfileContainer.vue";
import SidebarNav from "@pizza/shared/common/components/SidebarNav.vue";

const links = [
  { label: "История заказов", href: "/orders" },
  { label: "Мои данные", href: "/profile" },
];
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/app.scss" as *;

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
<style lang="scss">
/* Global styles for the app */
@use "@pizza/shared/assets/scss/app.scss" as *;
</style>
