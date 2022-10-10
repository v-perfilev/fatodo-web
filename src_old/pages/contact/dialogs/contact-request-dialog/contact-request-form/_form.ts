import * as Yup from 'yup';
import {ObjectSchema} from 'yup';
import {User, UserAccount} from '../../../../../models/user.model';
import {ContactRequestDTO} from '../../../../../models/dto/contact-request.dto';
import {userValidator} from './validators/user.validator';

export interface ContactRequestFormValues {
  usernameOrEmail: string;
  user: User;
  message: string;
}

export const defaultContactRequestFormValues: Readonly<ContactRequestFormValues> = {
  usernameOrEmail: '',
  user: null,
  message: '',
};

export class ContactRequestFormUtils {
  public static mapPropsToValues = (): ContactRequestFormValues => defaultContactRequestFormValues;

  public static validationSchema = (account: UserAccount): ObjectSchema =>
    Yup.object().shape({
      usernameOrEmail: userValidator(account.username, account.email).check(),
      user: Yup.string().required(),
    });

  public static mapValuesToDTO = (values: ContactRequestFormValues): ContactRequestDTO => ({
    recipientId: values.user.id,
    message: values.message,
  });
}
