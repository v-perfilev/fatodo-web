import {
  EventMessageParams,
  EventMessageType,
  Message,
  MessageReactions,
  MessageStatuses,
} from '../../models/message.model';
import {Chat} from '../../models/chat.model';
import {User} from '../../models/user.model';
import {TFunction} from 'i18next';

export type SetChatType = (chat: Chat) => void;
export type SetChatsType = (value: (prevState: Chat[]) => Chat[]) => void;
export type SetMessagesType = (value: (prevState: Message[]) => Message[]) => void;

export class MessageUtils {
  public static handleChatNewEvent = (chatEvent: Chat, setChats: SetChatsType): void => {
    if (chatEvent) {
      setChats((prevState) => [...prevState, chatEvent]);
    }
  };

  public static handleChatUpdateEvent = (
    chatEvent: Chat,
    setChats: SetChatsType,
    chat: Chat,
    setChat: SetChatType,
    account: User
  ): void => {
    if (chatEvent) {
      if (chatEvent.members.includes(account.id)) {
        if (chat?.id === chatEvent.id) {
          setChat(chatEvent);
        }
        setChats((prevState) => {
          const chatInList = prevState.find((c) => c.id === chatEvent.id);
          if (chatInList) {
            const index = prevState.indexOf(chatInList);
            prevState[index] = chatEvent;
          }
          return [...prevState];
        });
      } else {
        if (chat?.id === chatEvent.id) {
          setChat(null);
        }
        setChats((prevState) => {
          const chatInList = prevState.find((c) => c.id === chatEvent.id);
          if (chatInList) {
            const index = prevState.indexOf(chatInList);
            prevState.splice(index, 1);
          }
          return [...prevState];
        });
      }
    }
  };

  public static handleChatLastMessageEvent = (chatEvent: Chat, setChats: SetChatsType): void => {
    if (chatEvent?.lastMessage) {
      setChats((prevState) => {
        const chatInList = prevState.find((c) => c.id === chatEvent.id);
        if (chatInList) {
          const index = prevState.indexOf(chatInList);
          prevState.splice(index, 1);
        }
        return [...prevState, chatEvent];
      });
    }
  };

  public static handleMessageNewEvent = (chat: Chat, messageEvent: Message, setMessages: SetMessagesType): void => {
    if (chat?.id === messageEvent?.chatId) {
      setMessages((prevState) => [...prevState, messageEvent]);
    }
  };

  public static handleMessageUpdateEvent = (chat: Chat, messageEvent: Message, setMessages: SetMessagesType): void => {
    if (chat?.id === messageEvent?.chatId) {
      setMessages((prevState) => {
        const messageInList = prevState.find((m) => m.id === messageEvent.id);
        if (messageInList) {
          const index = prevState.indexOf(messageInList);
          prevState[index] = messageEvent;
        }
        return [...prevState];
      });
    }
  };

  public static handleMessageStatusesEvent = (
    chat: Chat,
    messageStatusesEvent: MessageStatuses,
    setMessages: SetMessagesType
  ): void => {
    if (chat?.id === messageStatusesEvent?.chatId) {
      setMessages((prevState) => {
        const messageInList = prevState.find((m) => m.id === messageStatusesEvent.messageId);
        if (messageInList) {
          // const updatedMessage = messageInList;
          // updatedMessage.statuses = messageStatusesEvent.statuses;
          // const index = prevState.indexOf(messageInList);
          // prevState[index] = updatedMessage;
          messageInList.statuses = messageStatusesEvent.statuses;
        }
        return [...prevState];
      });
    }
  };

  public static handleMessageReactionsEvent = (
    chat: Chat,
    messageReactionsEvent: MessageReactions,
    setMessages: SetMessagesType
  ): void => {
    if (chat?.id === messageReactionsEvent?.chatId) {
      setMessages((prevState) => {
        const messageInList = prevState.find((m) => m.id === messageReactionsEvent.messageId);
        if (messageInList) {
          messageInList.reactions = messageReactionsEvent.reactions;
        }
        return [...prevState];
      });
    }
  };

  public static parseEventMessage = (message: Message): EventMessageParams => {
    return JSON.parse(message.text) as EventMessageParams;
  };

  public static buildEventMessageText = (
    message: Message,
    params: EventMessageParams,
    users: User[],
    t: TFunction
  ): string => {
    let text = '';
    const username = MessageUtils.extractUsernameFromMessage(users, message);
    const usernames = MessageUtils.extractUsernamesFromParams(users, params);
    const title = MessageUtils.extractTextFromParams(params);
    if (
      params?.type === EventMessageType.CREATE_DIRECT_CHAT ||
      params?.type === EventMessageType.CREATE_CHAT ||
      params?.type === EventMessageType.ADD_MEMBERS ||
      params?.type === EventMessageType.DELETE_MEMBERS
    ) {
      text = t('message:event.' + params.type, {username, usernames});
    } else if (params?.type === EventMessageType.RENAME_CHAT) {
      text = t('message:event.' + params.type, {username, title});
    } else if (params?.type === EventMessageType.LEAVE_CHAT) {
      text = t('message:event.' + params.type, {username});
    }
    return text;
  };

  public static isReadMessage = (message: Message, account: User): boolean => {
    const readUserIds = message?.statuses.filter((status) => status.type === 'READ').map((status) => status.userId);
    return readUserIds && readUserIds.includes(account?.id);
  };

  public static extractUserFromMessage = (users: User[], message: Message): User => {
    return users.find((user) => user.id === message.userId);
  };

  public static extractUsernameFromMessage = (users: User[], message: Message): string => {
    const user = users.find((user) => user.id === message.userId);
    return user?.username || '';
  };

  public static extractUsernamesFromParams = (users: User[], params: EventMessageParams): string => {
    const eventUsers = users.filter((user) => params?.ids?.includes(user.id)).map((user) => user.username);
    return eventUsers && eventUsers.length > 0 ? eventUsers.join(', ') : '';
  };

  public static extractTextFromParams = (params: EventMessageParams): string => {
    return params?.text || '';
  };
}
