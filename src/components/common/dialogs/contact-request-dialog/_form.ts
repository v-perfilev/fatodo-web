export interface ContactRequestFormValues {
  user: string;
  userId: string;
  message: string;
}

export const defaultContactRequestFormValues: Readonly<ContactRequestFormValues> = {
  user: '',
  userId: '',
  message: ''
};
