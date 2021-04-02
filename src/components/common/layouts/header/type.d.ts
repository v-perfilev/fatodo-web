export interface RedirectMap {
  toLogin: () => void;
  toRegistration: () => void;
  toAccount: () => void;
  toMessages: () => void;
  toContacts: () => void;
  toRootAndLogout: () => void;
}
