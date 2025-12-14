<template>
  <div :class="$style.user">
    <router-link to="/login" :class="$style.login">
      <span>Войти</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.user {
  display: flex;
  align-items: center;

  a,
  div {
    display: block;
    padding: 14px 20px;
    transition: 0.3s;
    background-color: ds-colors.$green-500;
    cursor: pointer;

    &:hover:not(:active) {
      background-color: ds-colors.$green-400;
    }

    &:active {
      background-color: ds-colors.$green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  span {
    @include ds-typography.r-s14-h16;
    display: inline-block;
    vertical-align: middle;
    color: ds-colors.$white;
  }
}

.login {
  &::after {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-left: 8px;
    content: "";
    vertical-align: middle;
    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
