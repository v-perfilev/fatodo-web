export interface RedirectMap {
  toAccount: () => void;
  toGroups: () => void;
  toChats: () => void;
  toContacts: () => void;
  logout: () => void;
}
