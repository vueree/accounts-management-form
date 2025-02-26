export interface IAccount {
  id: number;
  label: string;
  type: "LDAP" | "Локальная";
  login: string;
  password: string | null;
}

export type AccountWithoutId = Omit<IAccount, "id">;

export interface IOption {
  value: string;
  label: string;
}
