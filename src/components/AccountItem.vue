<script setup lang="ts">
import { ref, computed } from "vue";
import MultiInput from "./MultiInput.vue";
import MultiButton from "./MultiButton.vue";
import CustomSelect from "./CustomSelect.vue";
import type { IAccount } from "../types/";

const props = defineProps<{
  account: IAccount;
}>();

const emit = defineEmits(["update:account", "delete:account"]);

const localAccount = ref({ ...props.account });
const showTagsTooltip = ref(false);

const loginError = computed(() =>
  localAccount.value.login ? "" : "Логин обязателен"
);

const passwordError = computed(() =>
  localAccount.value.type === "Локальная" && !localAccount.value.password
    ? "Пароль обязателен"
    : ""
);

const validateAndSave = () => {
  if (!loginError.value && !passwordError.value) {
    const labels = localAccount.value.label
      .split(";")
      .map((label) => ({ text: label.trim() }))
      .filter((label) => label.text);
    emit("update:account", {
      ...localAccount.value,
      label: JSON.stringify(labels),
    });
  }
};

const deleteAccount = () => {
  emit("delete:account", localAccount.value.id);
};
</script>

<template>
  <div class="account-item">
    <MultiInput
      v-model="localAccount.label"
      title="Метка"
      placeholder="Метка (необязательно, максимум 50 символов)"
      :maxLength="50"
      @blur="validateAndSave"
    >
      <span
        class="absolute pointer text-center tooltip-icon"
        @click="showTagsTooltip = true"
        >?</span
      >
    </MultiInput>
    <CustomSelect
      v-model="localAccount.type"
      title="Тип записи"
      :options="[
        { value: 'LDAP', label: 'LDAP' },
        { value: 'Локальная', label: 'Локальная' },
      ]"
      @update:modelValue="validateAndSave"
    />
    <MultiInput
      v-model="localAccount.login"
      title="Логин"
      placeholder="Логин (обязательно, максимум 100 символов)"
      :maxLength="100"
      :error="loginError"
      @blur="validateAndSave"
    />
    <MultiInput
      v-if="localAccount.type === 'Локальная'"
      v-model="localAccount.password"
      title="Пароль"
      type="password"
      placeholder="Пароль (обязательно, максимум 100 символов)"
      :maxLength="100"
      :error="passwordError"
      @blur="validateAndSave"
    />
    <MultiButton label="Удалить" variant="danger" @click="deleteAccount" />
  </div>

  <div
    v-show="showTagsTooltip"
    class="flex items-center justify-center popup-tooltip"
  >
    <div class="popup-content">
      <MultiButton
        class="close-popup absolute pointer flex items-center justify-center b-none"
        label="x"
        @click="() => (showTagsTooltip = false)"
      />
      <h3>Как использовать метки</h3>
      <p>Метки помогают организовать и быстро находить ваши учетные записи.</p>
      <p>Примеры меток: работа; личное; банк; социальные сети</p>
      <p>Разделяйте метки точкой с запятой (;)</p>
    </div>
  </div>
</template>

<style scoped>
.account-item {
  position: relative;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: var(--secondary-color);
  border: 1px solid #e1deff;
}

.tooltip-icon {
  top: 46px;
  right: 24px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 50%;
  line-height: 20px;
  margin-left: 6px;
  font-weight: bold;
}

.popup-tooltip {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popup-content {
  background-color: var(--secondary-color);
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  width: 400px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-popup {
  top: 10px;
  right: 10px;
  background: var(--error-color);
  color: var(--secondary-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
}
</style>
