<template>
  <div :class="$style.user">
    <!-- Если не авторизован -->
    <router-link v-if="!props.user" to="/login" :class="$style.login">
      <span>Войти</span>
    </router-link>

    <!-- Если авторизован -->
    <template v-else>
      <router-link to="/profile" :class="$style.profile">
        <img :src="props.user.avatar" :alt="props.user.name" />
        <span>{{ props.user.name }}</span>
      </router-link>

      <div :class="$style.logout" @click="onLogout">
        <span>Выйти</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { IUserData } from "@/modules/profile/types/IUserData";
import { useAuthStore } from "@/modules/auth/authStore";
import router from "@/router";

const props = defineProps<{
  user: IUserData | null;
}>();

const authStore = useAuthStore();

async function onLogout() {
  await authStore.logout();
  router.push("/");
}
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

  img {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;
    border-radius: 50%;
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
  margin-right: 8px;
}

.logout {
  &::before {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url("@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
