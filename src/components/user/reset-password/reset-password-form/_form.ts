import * as Yup from 'yup';
import {ResetPasswordDTO} from '../../../../models/dto/reset-password.dto';
import {passwordValidator} from './validators/password.validator';
import {passwordRepeatValidator} from './validators/password-repeat.validator';

export interface ResetPasswordFormValues {
  password: string;
  repeatPassword: string;
}

const defaultResetPasswordValues: Readonly<ResetPasswordFormValues> = {
  password: '',
  repeatPassword: ''
};

export class ResetPasswordFormUtils {
  public static mapPropsToValues = (): ResetPasswordFormValues => defaultResetPasswordValues;

  public static validationSchema = Yup.object().shape({
    password: passwordValidator,
    repeatPassword: passwordRepeatValidator
  });

  public static mapValuesToDTO = (values: ResetPasswordFormValues, code: string, token: string): ResetPasswordDTO => ({
    code: code,
    password: values.password,
    token: token
  });
}
