import * as Yup from 'yup';

export interface CreateChatValues {
  users: string[];
  userIds: string[];
}

export const defaultCreateChatFormValues: Readonly<CreateChatValues> = {
  users: [],
  userIds: []
};

export class ContactRequestFormUtils {
  public static mapPropsToValues = (): CreateChatValues => defaultCreateChatFormValues;

  public static validationSchema = Yup.object().shape({
    users: Yup.string().required()
  });

  public static mapValuesToDTO = (values: CreateChatValues): string[] => values.userIds;
}
