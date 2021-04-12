import * as Yup from 'yup';
import {ObjectSchema} from 'yup';
import {User, UserAccount} from '../../../../../models/user.model';
import {userValidator} from './validators/user.validator';

export interface CreateChatValues {
  usernames: string[];
  users: User[];
  user: string;
}

export const defaultCreateChatFormValues: Readonly<CreateChatValues> = {
  usernames: [],
  users: [],
  user: '',
};

export class CreateChatFormUtils {
  public static mapPropsToValues = (): CreateChatValues => defaultCreateChatFormValues;

  public static validationSchema = (account: UserAccount): ObjectSchema =>
    Yup.object().shape({
      users: Yup.array().required(),
      user: userValidator(account.username).check(),
    });

  public static mapValuesToDTO = (values: CreateChatValues): string[] => values.users.map((user) => user.id);
}
