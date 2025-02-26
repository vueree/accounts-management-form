<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { useAccountStore } from "../stores/accountStore";
import AccountItem from "./AccountItem.vue";
import MultiButton from "./MultiButton.vue";
import type { IAccount } from "../types/";

const accountStore = useAccountStore();
const accountsList = ref<HTMLElement | null>(null);

const accounts = computed(() => accountStore.accounts);

const addAccount = async () => {
  const newAccount: IAccount = {
    id: Date.now(),
    label: "",
    type: "Локальная",
    login: "",
    password: "",
  };
  accountStore.addAccount(newAccount);

  await nextTick();

  if (accountsList.value) {
    const tempElement = document.createElement("div");
    accountsList.value.appendChild(tempElement);
    tempElement.scrollIntoView({ behavior: "smooth", block: "end" });

    setTimeout(() => {
      if (tempElement.parentNode) {
        tempElement.parentNode.removeChild(tempElement);
      }
    }, 100);
  }
};

const updateAccount = (updatedAccount: IAccount) => {
  accountStore.updateAccount(updatedAccount);
};

const deleteAccount = (id: number) => {
  accountStore.removeAccount(id);
};
</script>

<template>
  <div class="account-form overflow-y-auto">
    <h1 class="title">Управление учетными записями</h1>
    <MultiButton
      class="mb-1"
      label="+ Добавить учетную запись"
      @click="addAccount"
    />
    <div ref="accountsList" class="accounts-list">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update:account="updateAccount"
        @delete:account="deleteAccount"
      />
    </div>
  </div>
</template>

<style scoped>
.account-form {
  max-height: 100vh;
  padding-right: 8px;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  scrollbar-width: none;
}

.account-form::-webkit-scrollbar {
  display: none;
}

.add-account {
  background-color: var(--primary-color);
}
</style>
