<template>
  <AddressCard
    v-if="!isOpen"
    :title="address.name"
    :address="concatAddress(address)"
    @edit="emits('edit', address.id)"
  />

  <AddressForm
    v-else
    v-model="draft"
    :title="formTitle"
    @submit="onSubmit"
    @cancel="emits('cancel')"
    @remove="emits('remove', address.id)"
  />
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import AddressCard from "./AddressCard.vue";
import AddressForm from "./AddressForm.vue";
import { IUserAddress } from "@/types/IUserAddress";
import concatAddress from "@/helpers/concatAddress";
import { AddressDraftType } from "@/types/draft";

const props = defineProps<{
  address: IUserAddress;
  isOpen: boolean;
  formTitle?: string;
}>();
const emits = defineEmits<{
  (e: "edit", id: number): void;
  (e: "save", payload: { id: number | null; form: AddressDraftType }): void;
  (e: "remove", id: number): void;
  (e: "cancel"): void;
}>();

const { address, isOpen } = toRefs(props);

const draft = ref<AddressDraftType>({ ...address.value });

watch(
  () => [isOpen.value, address.value],
  () => {
    if (isOpen.value) draft.value = { ...address.value };
  },
  { immediate: true, deep: false },
);

function onSubmit() {
  emits("save", { id: address.value?.id ?? null, form: draft.value });
}
</script>
