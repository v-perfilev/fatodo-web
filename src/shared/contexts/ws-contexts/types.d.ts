import {Chat} from '../../../models/chat.model';
import {Message, MessageReactions, MessageStatuses} from '../../../models/message.model';

export interface WsMessagesState {
  chatNewEvent: Chat;
  chatUpdateEvent: Chat;
  chatLastMessageEvent: Chat;
  chatLastMessageUpdateEvent: Chat;
  messageNewEvent: Message;
  messageUpdateEvent: Message;
  messageStatusesEvent: MessageStatuses;
  messageReactionsEvent: MessageReactions;
}
