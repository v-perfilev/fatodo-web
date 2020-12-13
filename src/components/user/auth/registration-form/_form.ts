import * as Yup from 'yup';
import {emailValidator} from '../../../../shared/forms/validators/email.validator';
import {usernameValidator} from '../../../../shared/forms/validators/username.validator';
import {passwordValidator} from '../../../../shared/forms/validators/password.validator';
import {RegistrationDTO} from '../../../../models/dto/registrationDTO';

export interface RegistrationFormValues {
  email: string;
  username: string;
  password: string;
}

const defaultRegistrationFormValues: Readonly<RegistrationFormValues> = {
  email: '',
  username: '',
  password: '',
};

export class RegistrationFormUtils {
  public static mapPropsToValues = (): RegistrationFormValues => defaultRegistrationFormValues;

  public static validationSchema = Yup.object().shape({
    email: emailValidator.check(),
    username: usernameValidator.check(),
    password: passwordValidator,
  });

  public static mapValuesToDTO = (
    values: RegistrationFormValues,
    language: string,
    token: string
  ): RegistrationDTO => ({
    email: values.email,
    username: values.username,
    password: values.password,
    language: language,
    token: token,
  });
}
