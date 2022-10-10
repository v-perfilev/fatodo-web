export interface RedirectMap {
  toLogin: () => void;
  toRegistration: () => void;
  toAccount: () => void;
  toGroups: () => void;
  toChats: () => void;
  toContacts: () => void;
  toRootAndLogout: () => void;
}
