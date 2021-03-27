import {Chat} from '../../../models/chat.model';
import {Message} from '../../../models/message.model';

export interface WsMessagesState {
  chatNewEvent: Chat;
  chatUpdateEvent: Chat;
  chatLastMessageEvent: Chat;
  messageNewEvent: Message;
  messageUpdateEvent: Message;
}
