<template>
  <div :class="$style.main">
    <!-- Sidebar -->
    <SidebarNav :width="180" :links="links" />
    
    <!-- Content -->
    <div :class="$style.content">
      <div :class="$style.title">
        <h1>История заказов</h1>
      </div>
      <OrderContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderContainer from "@/components/OrderContainer.vue";
import SidebarNav from "@pizza/shared/common/components/SidebarNav.vue";

const links = [
  { label: "История заказов", href: "/orders" },
  { label: "Мои данные", href: "/profile" },
];
</script>

<style lang="scss">
@use "@pizza/shared/assets/scss/app.scss" as *;
</style>

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
