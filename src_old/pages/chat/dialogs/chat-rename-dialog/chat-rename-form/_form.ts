import * as Yup from 'yup';
import {Chat} from '../../../../../models/chat.model';
import i18n from '../../../../../shared/i18n';

export interface ChatRenameValues {
  title: string;
}

export const defaultChatRenameFormValues = (chat: Chat): Readonly<ChatRenameValues> => ({
  title: chat?.title ? chat.title : '',
});

export class ChatRenameFormUtils {
  public static mapPropsToValues = (chat: Chat): ChatRenameValues => defaultChatRenameFormValues(chat);

  public static validationSchema = Yup.object().shape({
    title: Yup.string().required(() => i18n.t('chat:renameChat.fields.title.required')),
  });

  public static mapValuesToDTO = (values: ChatRenameValues): string => values.title;
}
