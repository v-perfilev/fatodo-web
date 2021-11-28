import {ChangePasswordDTO} from '../../../../models/dto/change-password.dto';
import * as Yup from 'yup';
import i18n from 'i18next';
import {passwordValidator} from './validators/password.validator';

export interface AccountPasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

const defaultAccountPasswordFormValues: Readonly<AccountPasswordFormValues> = {
  oldPassword: '',
  newPassword: '',
};

export class AccountPasswordFormUtils {
  public static mapPropsToValues = (): AccountPasswordFormValues => defaultAccountPasswordFormValues;

  public static validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(() => i18n.t('account:fields.password.required')),
    newPassword: passwordValidator,
  });

  public static mapValuesToDTO = (values: AccountPasswordFormValues): ChangePasswordDTO => {
    return {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
  };
}
