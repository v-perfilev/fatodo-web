import {Chat, ChatInfo} from '../../models/Chat';
import {User, UserAccount} from '../../models/User';
import {MessageUtils} from './MessageUtils';
import {FilterUtils} from './FilterUtils';
import {ChatItem, Message} from '../../models/Message';
import {TFunction} from 'i18next';
import {UserUtils} from './UserUtils';

export class ChatUtils {
  public static getDirectChatUser = (chat: Chat, users: User[], account: User): User => {
    const memberId = chat.members.map((m) => m.userId).find((id) => id !== account.id);
    return chat.isDirect && memberId ? users.find((u) => u.id === memberId) : undefined;
  };

  public static getTitle = (chat: Chat | ChatInfo, users: User[], account: User, t: TFunction): string => {
    return chat?.title
      ? chat.title
      : chat?.members
          .map((m) => m.userId)
          .filter((id) => id !== account.id)
          .map((id) => users.find((u) => u.id === id))
          .filter(FilterUtils.notUndefinedFilter)
          .map((user) => UserUtils.getUsername(user, t))
          .join(', ');
  };

  public static extractUserIds = (chats: Chat[]): string[] => {
    const chatUserIds = chats.flatMap((c) => c.members).map((m) => m.userId);
    const lastMessageUserIds = chats.map((c) => c.lastMessage?.userId).filter(FilterUtils.notUndefinedFilter);
    const eventUserIds = chats
      .map((c) => c.lastMessage)
      .filter(FilterUtils.notNullFilter)
      .filter(FilterUtils.notUndefinedFilter)
      .filter((m) => m.isEvent)
      .map((m) => MessageUtils.parseEventMessage(m))
      .flatMap((p) => p.ids);
    return [...chatUserIds, ...lastMessageUserIds, ...eventUserIds];
  };

  public static getUnreadMessages = (chatItems: ChatItem[], account: UserAccount, indexes: number[]): Message[] => {
    return indexes
      ? indexes
          .map((index) => chatItems[index])
          .filter((item) => MessageUtils.isMessage(item.message))
          .filter((item) => MessageUtils.isIncomingMessage(item.message, account))
          .filter((item) => !MessageUtils.isReadMessage(item.message, account))
          .map((item) => item.message)
      : [];
  };
}
