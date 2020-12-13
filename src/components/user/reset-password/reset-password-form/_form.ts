import * as Yup from 'yup';
import {passwordValidator} from '../../../../shared/forms/validators/password.validator';
import {passwordRepeatValidator} from '../../../../shared/forms/validators/password-repeat.validator';
import {ResetPasswordDTO} from '../../../../models/dto/reset-password.dto';

export interface ResetPasswordFormValues {
  password: string;
  repeatPassword: string;
}

const defaultResetPasswordValues: Readonly<ResetPasswordFormValues> = {
  password: '',
  repeatPassword: '',
};

export class ResetPasswordFormUtils {
  public static mapPropsToValues = (): ResetPasswordFormValues => defaultResetPasswordValues;

  public static validationSchema = Yup.object().shape({
    password: passwordValidator,
    repeatPassword: passwordRepeatValidator,
  });

  public static mapValuesToDTO = (values: ResetPasswordFormValues, code: string, token: string): ResetPasswordDTO => ({
    code: code,
    password: values.password,
    token: token,
  });
}
