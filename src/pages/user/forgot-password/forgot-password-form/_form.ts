import * as Yup from 'yup';
import i18n from '../../../../shared/i18n';
import {ForgotPasswordDTO} from '../../../../models/dto/forgot-password.dto';

export interface ForgotPasswordFormValues {
  user: string;
}

const defaultForgotPasswordFormValues: Readonly<ForgotPasswordFormValues> = {
  user: '',
};

export class ForgotPasswordFormUtils {
  public static mapPropsToValues = (): ForgotPasswordFormValues => defaultForgotPasswordFormValues;

  public static validationSchema = Yup.object().shape({
    user: Yup.string().required(() => i18n.t('account:fields.user.required')),
  });

  public static mapValuesToDTO = (values: ForgotPasswordFormValues, token: string): ForgotPasswordDTO => ({
    user: values.user,
    token: token,
  });
}
