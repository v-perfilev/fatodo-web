import * as Yup from 'yup';
import {Chat} from '../../../../../models/chat.model';

export interface RenameChatValues {
  title: string;
}

export const defaultRenameChatFormValues = (chat: Chat): Readonly<RenameChatValues> => ({
  title: chat.title! ? chat.title : ''
});

export class RenameChatFormUtils {
  public static mapPropsToValues = (): RenameChatValues => defaultRenameChatFormValues(null);

  public static validationSchema = Yup.object().shape({
    users: Yup.array().required()
  });

  public static mapValuesToDTO = (values: RenameChatValues): string => values.title;
}
