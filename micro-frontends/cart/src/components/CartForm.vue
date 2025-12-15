<template>
  <div :class="$style.form">
    <label :class="$style.selectRow">
      <span :class="$style.label">Получение заказа:</span>
      <DropdownComponent
        v-model="delivery"
        name="delivery"
        :options="[
          { value: BaseDeliveryEnum.self, text: 'Заберу сам' },
          { value: BaseDeliveryEnum.new, text: 'Новый адрес' },
          ...additionalAddresses,
        ]"
      />
    </label>
    <div :class="$style.inputRow">
      <FormLine
        v-model="phone"
        name="tel"
        label="Контактный телефон:"
        :placeholder="'+71234567890'"
        :error="errors.phone"
      />
    </div>

    <div v-if="delivery !== BaseDeliveryEnum.self" :class="$style.address">
      <span :class="$style.label">Адрес:</span>

      <FormLine
        v-model="street"
        name="street"
        label="Улица*"
        :readonly="isReadonly"
        :error="!isReadonly ? errors.street : null"
      />
      <FormLine
        v-model="house"
        name="house"
        label="Дом*"
        small
        :readonly="isReadonly"
        :error="!isReadonly ? errors.house : null"
      />
      <FormLine
        v-model="apartment"
        name="apartment"
        label="Квартира"
        small
        :readonly="isReadonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DropdownComponent from "@pizza/shared/common/components/DropdownComponent.vue";
import FormLine from "@/components/FormLine.vue";
import { type IAddress } from "@/api/profileApi";
import { computed, ref, watch } from "vue";
import { BaseDeliveryEnum } from "@/types/BaseDeliveryEnum";

const delivery = defineModel<string>("delivery");
const phone = defineModel<string>("phone");

const additionalAddresses = computed(() => {
  return props.addresses.map((address) => {
    return { value: address.id.toString(), text: address.name };
  });
});

const street = defineModel<string>("street", { default: "" });
const house = defineModel<string>("house", { default: "" });
const apartment = defineModel<string>("apartment", { default: "" });

const props = defineProps<{
  addresses: IAddress[];
}>();

const selectedAddress = computed<IAddress | null>(() => {
  const val = delivery.value;
  if (!val || val === BaseDeliveryEnum.self || val === BaseDeliveryEnum.new)
    return null;
  return props.addresses.find((a) => String(a.id) === val) ?? null;
});

const isReadonly = computed(() => selectedAddress.value !== null);

watch(selectedAddress, (addr) => {
  if (addr) {
    street.value = addr.street ?? "";
    house.value = addr.building ?? "";
    apartment.value = addr.flat ?? "";
  } else {
    if (
      delivery.value === BaseDeliveryEnum.self ||
      delivery.value === BaseDeliveryEnum.new
    ) {
      street.value = "";
      house.value = "";
      apartment.value = "";
    }
  }
});

const errors = ref<{ phone: string; street: string; house: string }>({
  phone: "",
  street: "",
  house: "",
});

function normalizePhone(p: string): string {
  const raw = String(p ?? "");
  const cleaned = raw.replace(/\D/g, "");
  return cleaned ? "+" + cleaned : "+";
}
function isValidPhone(p: string): boolean {
  const digits = (p.match(/\d/g) || []).length;
  return digits >= 8;
}

function hasAnyLetter(value: string): boolean {
  return /[A-Za-zА-Яа-яЁё]/.test(value);
}

watch(phone, (val) => {
  const normalized = normalizePhone(val as string);
  errors.value.phone = !isValidPhone(normalized)
    ? "Неверный формат телефона"
    : "";
});
watch([() => delivery.value, () => street.value, () => house.value], () => {
  if (delivery.value === BaseDeliveryEnum.new) {
    const streetTrimmed = street.value.trim();
    if (!streetTrimmed) {
      errors.value.street = "Укажите улицу";
    } else if (!hasAnyLetter(streetTrimmed)) {
      errors.value.street = "Улица должна содержать хотя бы одну букву";
    } else {
      errors.value.street = "";
    }
    errors.value.house = !house.value.trim() ? "Укажите дом" : "";
  } else {
    errors.value.street = "";
    errors.value.house = "";
  }
});
</script>

<style module lang="scss">
@use "@pizza/shared/assets/scss/ds-system/ds-typography";
@use "@pizza/shared/assets/scss/ds-system/ds-colors";

.form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.selectRow {
  display: flex;
  align-items: center;
  margin-right: auto;
  gap: 16px;
}
.label {
  @include ds-typography.b-s16-h19;
  white-space: nowrap;
}
.select {
  padding: 8px 12px;
  border: 1px solid rgba(ds-colors.$green-500, 0.2);
  border-radius: 8px;
  outline: none;
}
.input {
}
.address {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap: 16px;
  flex-wrap: wrap;
}
.inputRow {
  position: relative;
  margin-left: auto;
}
.small {
  max-width: 120px;
}
.error {
  @include ds-typography.r-s14-h16;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -18px;
  margin: 0;
  color: ds-colors.$orange-100;
}
/* remove duplicate error style block */
</style>
