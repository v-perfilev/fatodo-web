import * as Yup from 'yup';
import i18n from '../../../../../shared/i18n';
import {Message} from '../../../../../models/message.model';
import {MessageDTO} from '../../../../../models/dto/message.dto';

export interface ChatEditValues {
  text: string;
}

export const defaultChatEditFormValues = (message: Message): Readonly<ChatEditValues> => ({
  text: message?.text ? message.text : '',
});

export class ChatEditFormUtils {
  public static mapPropsToValues = (message: Message): ChatEditValues => defaultChatEditFormValues(message);

  public static validationSchema = Yup.object().shape({
    text: Yup.string().required(() => i18n.t('chat:editMessage.fields.text.required')),
  });

  public static mapValuesToDTO = (values: ChatEditValues): MessageDTO => ({
    text: values.text,
  });
}
