import { useAccountStore } from "./useAccountStore";

export const useFormLogic = () => {
  const { accounts, addAccount, updateAccount, deleteAccount } =
    useAccountStore();

  return { accounts, addAccount, updateAccount, deleteAccount };
};
