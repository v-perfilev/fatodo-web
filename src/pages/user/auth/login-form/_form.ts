import * as Yup from 'yup';
import i18n from '../../../../shared/i18n';
import {LoginDTO} from '../../../../models/dto/login.dto';

export interface LoginFormValues {
  user: string;
  password: string;
  rememberMe: boolean;
}

const defaultLoginFormValues: Readonly<LoginFormValues> = {
  user: '',
  password: '',
  rememberMe: false,
};

export class LoginFormUtils {
  public static mapPropsToValues = (): LoginFormValues => defaultLoginFormValues;

  public static validationSchema = Yup.object().shape({
    user: Yup.string().required(() => i18n.t('account:fields.user.required')),
    password: Yup.string().required(() => i18n.t('account:fields.password.required')),
  });

  public static mapValuesToDTO = (values: LoginFormValues, token: string): LoginDTO => ({
    user: values.user,
    password: values.password,
    token: token,
  });
}
