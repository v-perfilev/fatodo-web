import * as Yup from 'yup';
import {ObjectSchema} from 'yup';
import {UserAccount} from '../../../../models/user.model';
import {ContactRequestDTO} from '../../../../models/dto/contact-request.dto';
import {userValidator} from './validators/user.validator';

export interface ContactRequestFormValues {
  user: string;
  userId: string;
  message: string;
}

export const defaultContactRequestFormValues: Readonly<ContactRequestFormValues> = {
  user: '',
  userId: '',
  message: ''
};

export class ContactRequestFormUtils {
  public static mapPropsToValues = (): ContactRequestFormValues => defaultContactRequestFormValues;

  public static validationSchema = (account: UserAccount): ObjectSchema =>
    Yup.object().shape({
      user: userValidator(account.username, account.email).check(),
      userId: Yup.string().required()
    });

  public static mapValuesToDTO = (values: ContactRequestFormValues): ContactRequestDTO => ({
    recipientId: values.userId,
    message: values.message
  });
}
