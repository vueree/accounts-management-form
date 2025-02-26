import { ref } from "vue";
import type { Account } from "vue";

export function useValidation() {
  const errors = ref<{ [key: string]: string }>({});

  function validate(account: Account) {
    errors.value = {};
    if (!account.login.trim()) errors.value.login = "Логин обязателен";
    if (account.login.length > 100)
      errors.value.login = "Максимум 100 символов";
    if (account.password && account.password.length > 100)
      errors.value.password = "Максимум 100 символов";
    return Object.keys(errors.value).length === 0;
  }

  return { errors, validate };
}
