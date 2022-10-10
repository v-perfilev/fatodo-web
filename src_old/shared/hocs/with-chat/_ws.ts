import {Chat} from '../../../models/chat.model';
import {MessageStatuses} from '../../../models/message.model';
import {ArrayUtils} from '../../utils/array.utils';
import {User} from '../../../models/user.model';

type SetUnreadMessageMapType = (value: (prevState: Map<string, string[]>) => Map<string, string[]>) => void;

export const handleChatLastMessageEvent = (
  event: Chat,
  account: User,
  setUnreadMessageMap: SetUnreadMessageMapType,
): void => {
  const isNotEvent = event.lastMessage?.isEvent !== true;
  const isIncoming = event.lastMessage?.userId != account.id;
  if (isNotEvent && isIncoming) {
    const chatId = event.id;
    const messageId = event.lastMessage.id;
    setUnreadMessageMap((prevState) => {
      if (prevState.has(chatId)) {
        const messageIds = prevState.get(chatId);
        messageIds.push(messageId);
        prevState.set(chatId, messageIds);
      } else {
        prevState.set(chatId, [messageId]);
      }
      return new Map(prevState.entries());
    });
  }
};

export const handleMessageStatusesEvent = (
  event: MessageStatuses,
  account: User,
  unreadMessageMap: Map<string, string[]>,
  setUnreadMessageMap: SetUnreadMessageMapType,
): void => {
  const isChatInMap = unreadMessageMap && unreadMessageMap.has(event.chatId);
  const isReadByUser = event.statuses
    .filter((status) => status.type === 'READ')
    .map((status) => status.userId)
    .includes(account.id);
  if (isChatInMap && isReadByUser) {
    const chatId = event.chatId;
    const messageId = event.messageId;
    setUnreadMessageMap((prevState) => {
      if (prevState.has(chatId)) {
        const messageIds = prevState.get(chatId);
        ArrayUtils.deleteItem(messageIds, messageId);
        prevState.set(chatId, messageIds);
      }
      return new Map(prevState.entries());
    });
  }
};
