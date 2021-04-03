export interface RedirectMap {
  toLogin: () => void;
  toRegistration: () => void;
  toAccount: () => void;
  toChats: () => void;
  toContacts: () => void;
  toRootAndLogout: () => void;
}
