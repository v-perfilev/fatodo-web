import * as Yup from 'yup';
import {ObjectSchema} from 'yup';
import {UserAccount} from '../../../../models/user.model';
import {userValidator} from './validators/user.validator';

export interface CreateChatValues {
  users: string[];
  userIds: string[];
  user: string;
}

export const defaultCreateChatFormValues: Readonly<CreateChatValues> = {
  users: [],
  userIds: [],
  user: ''
};

export class CreateChatFormUtils {
  public static mapPropsToValues = (): CreateChatValues => defaultCreateChatFormValues;

  public static validationSchema = (account: UserAccount): ObjectSchema =>
    Yup.object().shape({
      users: Yup.string().required(),
      user: userValidator(account.username, account.email).check()
    });

  public static mapValuesToDTO = (values: CreateChatValues): string[] => values.userIds;
}
