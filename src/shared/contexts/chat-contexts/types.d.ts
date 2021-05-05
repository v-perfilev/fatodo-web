import {Chat} from '../../../models/chat.model';
import {Message, MessageReactions, MessageStatuses} from '../../../models/message.model';

export interface WsChatState {
  selectChatForWs: (chat: Chat) => void;
  chatNewEvent: Chat;
  chatUpdateEvent: Chat;
  chatLastMessageEvent: Chat;
  chatLastMessageUpdateEvent: Chat;
  messageNewEvent: Message;
  messageUpdateEvent: Message;
  messageStatusesEvent: MessageStatuses;
  messageReactionsEvent: MessageReactions;
}

export interface UnreadMessagesState {
  totalUnreadMessages: number;
  unreadMessageCountMap: Map<string, number>;
}
