import {Message} from '../../models/message.model';
import {Chat} from '../../models/chat.model';

type SetMessagesType = (value: (prevState: Message[]) => Message[]) => void;

export class WsUtils {

  public static handleMessageNewEvent = (chat: Chat, messageEvent: Message, setMessages: SetMessagesType): void => {
    if (chat?.id === messageEvent?.chatId) {
      setMessages(prevState => [...prevState, messageEvent]);
    }
  };

  public static handleMessageUpdateEvent = (chat: Chat, messageEvent: Message, setMessages: SetMessagesType): void => {
    if (chat?.id === messageEvent?.chatId) {
      setMessages(prevState => {
        const oldMessage = prevState.find((m) => m.id === messageEvent.id);
        if (oldMessage) {
          const index = prevState.indexOf(oldMessage);
          prevState[index] = messageEvent;
        }
        return [...prevState];
      });
    }
  };

}
