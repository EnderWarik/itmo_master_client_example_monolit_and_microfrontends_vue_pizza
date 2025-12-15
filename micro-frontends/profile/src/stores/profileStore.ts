import { defineStore } from "pinia";
import { ref } from "vue";
import { IUserAddress } from "@/types/IUserAddress";
import { AddressDraftType } from "@/types/draft";
import { authApi } from "@/api/authApi";
import { IUserData } from "@/types/IUserData";
import { profileApi } from "@/api/profileApi";

export const useProfileStore = defineStore("profileStore", () => {
  const addresses = ref<IUserAddress[]>([]);

  const user = ref<IUserData | null>(null);

  const isLoading = ref<boolean>(false);

  const addressForm = ref<AddressDraftType>({
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
  });

  function clearAddressForm() {
    addressForm.value = {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  }
  async function createAddress(form: AddressDraftType) {
    const name = form.name?.trim()
      ? form.name
      : `${form.street} ${form.building} ${form.flat ?? ""}`.trim();
    const created = await profileApi.createAddress({
      ...form,
      name,
      userId: user.value!.id,
    });
    addresses.value = [...addresses.value, created];
    return created;
  }

  async function updateAddress(payload: {
    id: number;
    form: AddressDraftType;
  }) {
    const { id, form } = payload;
    await profileApi.updateAddress({ id, ...form });
    addresses.value = addresses.value.map((a) =>
      a.id === id ? ({ ...a, ...form, id } as IUserAddress) : a,
    );
  }

  async function removeAddress(id: number) {
    await profileApi.deleteAddress(id);
    addresses.value = addresses.value.filter((a) => a.id !== id);
  }
  function saveAddressFromForm(): IUserAddress {
    if (!addressForm.value.name) {
      addressForm.value.name = `${addressForm.value.street} ${addressForm.value.building} ${addressForm.value.flat}`;
    }

    const correctAddress = { ...addressForm.value, id: 1, userId: "1" };
    addresses.value.push(correctAddress);
    return correctAddress;
  }

  function clearUser() {
    user.value = null;
    addresses.value = [];
  }
  async function init(): Promise<void> {
    try {
      isLoading.value = true;
      const [userData, fetchedAddresses] = await Promise.all([
        authApi.whoAmI(),
        profileApi.getAddresses(),
      ]);
      user.value = userData;
      const uid = user.value?.id?.toString();
      // Filter addresses by userId (compare as strings to handle type mismatches)
      addresses.value = fetchedAddresses.filter((a) => a.userId?.toString() === uid);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    addresses,
    saveAddressFromForm,
    addressForm,
    clearAddressForm,
    user,
    isLoading,
    init,
    clearUser,
    createAddress,
    updateAddress,
    removeAddress,
  };
});
