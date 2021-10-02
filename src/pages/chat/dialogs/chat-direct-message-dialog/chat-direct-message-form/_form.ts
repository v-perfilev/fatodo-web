import * as Yup from 'yup';
import i18n from '../../../../../shared/i18n';
import {Message} from '../../../../../models/message.model';
import {MessageDTO} from '../../../../../models/dto/message.dto';
import {User} from '../../../../../models/user.model';

export interface ChatDirectMessageValues {
  username: string;
  text: string;
}

export const defaultChatDirectMessageFormValues = (user: User): Readonly<ChatDirectMessageValues> => ({
  username: user.username,
  text: '',
});

export class ChatDirectMessageFormUtils {
  public static mapPropsToValues = (user: User): ChatDirectMessageValues => defaultChatDirectMessageFormValues(user);

  public static validationSchema = Yup.object().shape({
    text: Yup.string().required(() => i18n.t('chat:directMessage.fields.text.required')),
  });

  public static mapValuesToDTO = (values: ChatDirectMessageValues): MessageDTO => ({
    text: values.text,
  });
}
