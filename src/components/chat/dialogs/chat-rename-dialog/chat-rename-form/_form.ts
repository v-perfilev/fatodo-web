import * as Yup from 'yup';
import {Chat} from '../../../../../models/chat.model';
import i18n from '../../../../../shared/i18n';

export interface RenameChatValues {
  title: string;
}

export const defaultRenameChatFormValues = (chat: Chat): Readonly<RenameChatValues> => ({
  title: chat.title! ? chat.title : ''
});

export class RenameChatFormUtils {
  public static mapPropsToValues = (chat: Chat): RenameChatValues => defaultRenameChatFormValues(chat);

  public static validationSchema = Yup.object().shape({
    title: Yup.string().required(() => i18n.t('chat:renameChat.fields.title.required'))
  });

  public static mapValuesToDTO = (values: RenameChatValues): string => values.title;
}
