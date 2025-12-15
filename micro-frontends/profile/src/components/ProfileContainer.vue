<template>
  <div>
    <div v-if="profileStore.isLoading">Загрузка профиля...</div>
    <UserInfo
      v-else-if="profileStore.user"
      :name="profileStore.user.name"
      :phone="profileStore.user.phone"
      :avatar="profileStore.user.avatar"
    />

    <template v-for="address in profileStore.addresses" :key="address.id">
      <AddressLine
        :address="address"
        :is-open="openId === address.id"
        form-title="Изменить адрес"
        @edit="openEdit"
        @save="saveAddress"
        @remove="removeAddress"
        @cancel="closeEditor"
      />
    </template>

    <AddressForm
      v-if="openId === -1"
      v-model="newDraft"
      :is-new="true"
      title="Новый адрес"
      @submit="saveAddress({ id: null, form: newDraft })"
      @cancel="closeEditor"
    />

    <div :class="$style.addButton">
      <ButtonComponent type="button" variant="border" @click="openNew"
        >Добавить новый адрес</ButtonComponent
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProfileStore } from "@/stores/profileStore";
import AddressLine from "@/components/AddressLine.vue";
import UserInfo from "@/components/UserInfo.vue";
import AddressForm from "@/components/AddressForm.vue";
import ButtonComponent from "@pizza/shared/common/components/ButtonComponent.vue";
import { AddressDraftType } from "@/types/draft";

const profileStore = useProfileStore();

const openId = ref<number | null>(null);

const newDraft = ref<AddressDraftType>(profileStore.addressForm);

function openEdit(id: number) {
  openId.value = id;
}

function openNew() {
  profileStore.clearAddressForm();
  newDraft.value = profileStore.addressForm;
  openId.value = -1;
}

function closeEditor() {
  openId.value = null;
  profileStore.clearAddressForm();
  newDraft.value = profileStore.addressForm;
}

function saveAddress(payload: { id: number | null; form: AddressDraftType }) {
  const { id, form } = payload;
  if (id == null) {
    profileStore.createAddress(form).then(() => closeEditor());
  } else {
    profileStore.updateAddress({ id, form }).then(() => closeEditor());
  }
}

function removeAddress(id: number) {
  profileStore.removeAddress(id).then(() => closeEditor());
}
</script>
<style module lang="scss">
.addButton :global(button) {
  min-width: 220px;
  margin-top: 20px;
  padding: 16px 27px;
}
</style>
