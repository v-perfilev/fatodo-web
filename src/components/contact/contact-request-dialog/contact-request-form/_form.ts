import * as Yup from 'yup';
import {ObjectSchema} from 'yup';
import i18n from '../../../../shared/i18n';
import {ForgotPasswordDTO} from '../../../../models/dto/forgot-password.dto';
import {ForgotPasswordFormValues} from '../../../user/forgot-password/forgot-password-form/_form';
import {UserAccount} from '../../../../models/user.model';

export interface ContactRequestFormValues {
  user: string;
  userId: string;
  message: string;
}

export const defaultContactRequestFormValues: Readonly<ContactRequestFormValues> = {
  user: '',
  userId: '',
  message: '',
};

export class ContactRequestFormUtils {
  public static mapPropsToValues = (): ContactRequestFormValues => defaultContactRequestFormValues;

  public static validationSchema = (account: UserAccount): ObjectSchema =>
    Yup.object().shape({
      user: Yup.string()
        .required(() => i18n.t('contact:addContact.fields.user.required'))
        .test(
          'currentUser',
          () => i18n.t('contact:addContact.fields.user.current'),
          (value) => value !== account.username && value !== account.email
        )
        .when('userId', {
          is: (val) => !val,
          then: Yup.string().test(
            'userNotExist',
            () => i18n.t('contact:addContact.fields.user.notRegistered'),
            () => false
          ),
        }),
      userId: Yup.string().required(),
    });

  public static mapValuesToDTO = (values: ForgotPasswordFormValues, token: string): ForgotPasswordDTO => ({
    user: values.user,
    token: token,
  });
}
