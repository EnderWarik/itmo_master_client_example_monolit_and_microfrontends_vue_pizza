<template>
  <div :class="$style.user">
    <router-link v-if="!user" to="/login" :class="$style.login">
      <span>Войти</span>
    </router-link>
    <router-link v-else to="/profile" :class="$style.profile">
      <picture>
        <source type="image/webp" :srcset="user.avatar">
        <img :src="user.avatar" :alt="user.name" width="32" height="32">
      </picture>
      <span>{{ user.name }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { initAuth } from 'auth/entry';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const user = ref<User | null>(null);

function setUser(event: Event) {
  const detail = (event as CustomEvent).detail;
  user.value = detail;
}

function clearUser() {
  user.value = null;
}

onMounted(async () => {
  window.addEventListener('auth:login-success', setUser);
  window.addEventListener('auth:close', clearUser);
  
  try {
    const currentUser = await initAuth();
    if (currentUser) {
      user.value = currentUser;
    }
  } catch (e) {
    console.error('Failed to init auth in HeaderUser', e);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('auth:login-success', setUser);
  window.removeEventListener('auth:close', clearUser);
});
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

.profile {
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    border-radius: 50%;
  }
}
</style>
