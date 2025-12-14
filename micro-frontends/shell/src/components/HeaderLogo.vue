<template>
  <div :class="$style.wrapper">
    <router-link to="/" :class="$style.logo">
      <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40" />
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style module lang="scss">
.wrapper {
  padding: 10px 0;
}

.logo {
  display: block;

  img {
    display: block;
    width: 90px;
    height: 40px;
  }
}
</style>
