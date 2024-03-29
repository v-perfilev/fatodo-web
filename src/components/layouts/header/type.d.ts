export interface RedirectMap {
  toGroups: () => void;
  toCalendar: () => void;
  toChats: () => void;
  toContacts: () => void;
  toAccountMain: () => void;
  toAccountSettings: () => void;
  toAccountChangePassword: () => void;
  logout: () => void;
}
