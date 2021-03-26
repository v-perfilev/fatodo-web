import {Message} from '../../models/message.model';
import {Chat} from '../../models/chat.model';

type SetChatType = (chat: Chat) => void;
type SetChatsType = (value: (prevState: Chat[]) => Chat[]) => void;
type SetMessagesType = (value: (prevState: Message[]) => Message[]) => void;

export class MessageUtils {

  public static handleChatNewEvent = (chatEvent: Chat, setChats: SetChatsType): void => {
    if (chatEvent) {
      setChats(prevState => [...prevState, chatEvent]);
    }
  };

  public static handleChatUpdateEvent = (chatEvent: Chat, setChats: SetChatsType): void => {
    if (chatEvent) {
      setChats(prevState => {
        const chatInList = prevState.find((c) => c.id === chatEvent.id);
        if (chatInList) {
          const index = prevState.indexOf(chatInList);
          prevState[index] = chatEvent;
        }
        return [...prevState];
      });
    }
  };

  public static handleChatDeleteEvent = (
    chatEvent: Chat,
    setChats: SetChatsType,
    chat: Chat,
    setChat: SetChatType
  ): void => {
    if (chatEvent) {
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

}
