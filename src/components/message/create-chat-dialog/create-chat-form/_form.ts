import * as Yup from 'yup';

export interface CreateChatValues {
  users: string[];
  userIds: string[];
  test: string;
}

export const defaultCreateChatFormValues: Readonly<CreateChatValues> = {
  users: [],
  userIds: [],
  test: ''
};

export class CreateChatFormUtils {
  public static mapPropsToValues = (): CreateChatValues => defaultCreateChatFormValues;

  public static validationSchema = Yup.object().shape({
    users: Yup.string().required(),
    test: Yup.string()
      .required()
      .test(
        'test',
        () => 'nothing',
        (value) => value !== 'test'
      )
  });

  public static mapValuesToDTO = (values: CreateChatValues): string[] => values.userIds;
}
