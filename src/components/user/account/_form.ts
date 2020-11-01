import {UserAccount} from '../../../models/user.model';
import {ChangePasswordDTO} from '../../../models/dto/change-password.dto';

export interface AccountFormValues {
  username: string;
  firstname: string;
  lastname: string;
  language: string;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultAccountFormValues: Readonly<AccountFormValues> = {
  username: '',
  firstname: '',
  lastname: '',
  language: 'en',
  imageFilename: null,
  imageContent: null
};

export class AccountFormUtils {
  public static mapAccountToValues = (account: UserAccount): AccountFormValues => ({
    username: account?.username ?? defaultAccountFormValues.username,
    firstname: account?.info?.firstname ?? defaultAccountFormValues.firstname,
    lastname: account?.info?.lastname ?? defaultAccountFormValues.lastname,
    language: account?.info?.language ?? defaultAccountFormValues.language,
    imageFilename: account?.info?.imageFilename ?? defaultAccountFormValues.imageFilename,
    imageContent: null
  });

  public static mapValuesToFormData = (values: AccountFormValues, account: UserAccount): FormData => {
    const formData = new FormData();
    AccountFormUtils.addValueToForm(formData, 'id', account.id);
    AccountFormUtils.addValueToForm(formData, 'username', values.username);
    AccountFormUtils.addValueToForm(formData, 'firstname', values.firstname);
    AccountFormUtils.addValueToForm(formData, 'lastname', values.lastname);
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

export interface AccountPasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

const defaultAccountPasswordFormValues: Readonly<AccountPasswordFormValues> = {
  oldPassword: '',
  newPassword: ''
};

export class AccountPasswordFormUtils {
  public static mapAccountToValues = (): AccountPasswordFormValues => defaultAccountPasswordFormValues;

  public static mapValuesToDTO = (values: AccountPasswordFormValues): ChangePasswordDTO => {
    return {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    };
  };
}
