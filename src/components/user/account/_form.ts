import {UserAccount} from '../../../models/user.model';

export interface AccountFormValues {
  username: string;
  language: string;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultAccountFormValues: Readonly<AccountFormValues> = {
  username: '',
  language: 'en',
  imageFilename: null,
  imageContent: null
};

export class AccountFormUtils {
  public static mapAccountToValues = (account: UserAccount): AccountFormValues =>
    account
      ? {
        username: account.username,
        language: account.language,
        imageFilename: account.imageFilename,
        imageContent: null
      }
      : defaultAccountFormValues;

  public static mapValuesToFormData = (values: AccountFormValues, account: UserAccount): FormData => {
    const formData = new FormData();
    AccountFormUtils.addValueToForm(formData, 'id', account.id);
    AccountFormUtils.addValueToForm(formData, 'username', values.username);
    AccountFormUtils.addValueToForm(formData, 'language', values.language);
    AccountFormUtils.addValueToForm(formData, 'imageFilename', values.imageFilename);
    AccountFormUtils.addValueToForm(formData, 'imageContent', values.imageContent);
    return formData;
  };

  private static addValueToForm = (formData: FormData, name: string, value: any): void => {
    if (value) {
      formData.append(name, value);
    }
  };
}
