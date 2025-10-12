<template>
  <div :class="$style['form']">
    <CloseButton inner-aria-label="Закрыть форму авторизации" white />

    <TitleComponent :class="$style['title']" tag="h1">
      Авторизуйтесь на сайте
    </TitleComponent>

    <form novalidate @submit.prevent="onLogin">
      <FormLine>
        <TextInput
          v-model="email"
          name="email"
          type="email"
          placeholder="example@mail.ru"
        >
          <span>E-mail</span>
        </TextInput>
      </FormLine>
      <p v-if="errors.email" :class="$style.error">{{ errors.email }}</p>

      <FormLine>
        <TextInput
          v-model="password"
          name="pass"
          type="password"
          placeholder="***********"
        >
          <span>Пароль</span>
        </TextInput>
      </FormLine>
      <p v-if="errors.password" :class="$style.error">{{ errors.password }}</p>

      <p v-if="errors.general" :class="$style.error">{{ errors.general }}</p>

      <ButtonComponent type="submit" :disabled="loading">
        {{ loading ? "Авторизация..." : "Авторизоваться" }}
      </ButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "@/common/components/TitleComponent.vue";
import TextInput from "@/common/components/TextInput.vue";
import { ref } from "vue";
import ButtonComponent from "@/common/components/ButtonComponent.vue";
import CloseButton from "@/common/components/CloseButton.vue";
import FormLine from "@/modules/auth/components/FormLine.vue";
import { useAuthStore } from "@/modules/auth/authStore";
import { useRoute, useRouter } from "vue-router";
import { useProfileStore } from "@/modules/profile/profileStore";

const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errors = ref<{ email: string; password: string; general: string }>({
  email: "",
  password: "",
  general: "",
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(): boolean {
  const e = email.value.trim();
  const p = password.value;

  errors.value.email = "";
  errors.value.password = "";
  errors.value.general = "";

  if (!e) errors.value.email = "Введите e-mail.";
  else if (!emailRe.test(e)) errors.value.email = "Некорректный e-mail.";

  if (!p) errors.value.password = "Введите пароль.";
  else if (p.length < 8)
    errors.value.password = "Пароль должен быть не короче 8 символов.";

  return !errors.value.email && !errors.value.password;
}

async function onLogin() {
  const okLocal = validate();
  if (!okLocal) return;

  if (loading.value) return;
  loading.value = true;
  try {
    const ok = await authStore.login(email.value.trim(), password.value);
    if (ok) {
      await profileStore.init();
      const redirect = (route.query.redirect as string) || "/";
      await router.replace(redirect);
    } else {
      errors.value.general = "Неверный e-mail или пароль.";
    }
  } catch (e) {
    console.error(e);
    errors.value.general = "Ошибка входа. Попробуйте ещё раз.";
  } finally {
    loading.value = false;
  }
}
</script>

<style module lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_center";

.form {
  @include m_center.pf_center-all;
  z-index: 10;
  display: block;
  box-sizing: border-box;
  width: 455px;
  padding: 146px 32px 32px;
  background: ds-colors.$white url("@/assets/img/popup.svg") no-repeat center
    top;
  box-shadow: ds-shadows.$shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.title {
  margin-bottom: 24px;
  text-align: center;
}

.error {
  margin: 4px 0 12px;
  color: ds-colors.$orange-100;
}
</style>
