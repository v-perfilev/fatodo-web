import {Chat} from '../../models/Chat';
import {ChatItem, Message} from '../../models/Message';

export type ChatState = {
  chatId: string;
  chat: Chat;
  messages: Message[];
  chatItems: ChatItem[];
  createdIds: string[];
  allLoaded: boolean;
  loading: boolean;
};
