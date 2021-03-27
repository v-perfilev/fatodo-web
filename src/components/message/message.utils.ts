import {EventMessageParams, EventMessageType, Message} from '../../models/message.model';
import {Chat} from '../../models/chat.model';
import {User} from '../../models/user.model';
import {TFunction} from 'i18next';

export type SetChatType = (chat: Chat) => void;
export type SetChatsType = (value: (prevState: Chat[]) => Chat[]) => void;
export type SetMessagesType = (value: (prevState: Message[]) => Message[]) => void;

export class MessageUtils {

  public static handleChatNewEvent = (chatEvent: Chat, setChats: SetChatsType): void => {
    if (chatEvent) {
      setChats(prevState => [...prevState, chatEvent]);
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
        setChats(prevState => {
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
        setChats(prevState => {
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
      setChats(prevState => {
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
      setMessages(prevState => [...prevState, messageEvent]);
    }
  };

  public static handleMessageUpdateEvent = (chat: Chat, messageEvent: Message, setMessages: SetMessagesType): void => {
    if (chat?.id === messageEvent?.chatId) {
      setMessages(prevState => {
        const messageInList = prevState.find((m) => m.id === messageEvent.id);
        if (messageInList) {
          const index = prevState.indexOf(messageInList);
          prevState[index] = messageEvent;
        }
        return [...prevState];
      });
    }
  };

  public static parseEventMessage = (message: Message): EventMessageParams => {
    const params = JSON.parse(message.text) as EventMessageParams;
    params.userId = message.userId;
    return params;
  };

  public static buildEventMessageText = (
    message: Message,
    params: EventMessageParams,
    users: User[],
    t: TFunction
  ): string => {
    let text = null;
    const username = MessageUtils.extractUsernameFromMessage(users, message);
    const usernames = MessageUtils.extractUsernamesFromParams(users, params);
    const title = MessageUtils.extractTextFromParams(params);
    if (params?.type === EventMessageType.CREATE_DIRECT_CHAT
      || params?.type === EventMessageType.CREATE_CHAT
      || params?.type === EventMessageType.ADD_MEMBERS
      || params?.type === EventMessageType.DELETE_MEMBERS) {
      text = username && usernames ? t('message:event.' + params.type, {username, usernames}) : null;
    } else if (params?.type === EventMessageType.RENAME_CHAT) {
      text = username && title ? t('message:event.' + params.type, {username, title}) : null;
    } else if (params?.type === EventMessageType.LEAVE_CHAT) {
      text = username ? t('message:event.' + params.type, {username}) : null;
    }
    return text;
  };

  private static extractUsernameFromMessage = (users: User[], message: Message): string => {
    const user = users.find((user) => user.id === message.userId);
    return user?.username;
  };

  private static extractUsernamesFromParams = (users: User[], params: EventMessageParams): string => {
    const eventUsers = users.filter((user) => params?.ids?.includes(user.id))
      .map((user) => user.username);
    return eventUsers && eventUsers.length > 0
      ? eventUsers.join(', ')
      : null;
  };

  private static extractTextFromParams = (params: EventMessageParams): string => {
    return params?.text;
  };

}
