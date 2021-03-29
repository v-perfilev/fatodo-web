import {Chat} from '../../../../models/chat.model';
import {Message, MessageReactions, MessageStatuses} from '../../../../models/message.model';

type SetMessagesType = (value: (prevState: Message[]) => Message[]) => void;

export const handleMessageNewEvent = (chat: Chat, event: Message, setMessages: SetMessagesType): void => {
  if (chat?.id === event?.chatId) {
    setMessages((prevState) => [...prevState, event]);
  }
};

export const handleMessageUpdateEvent = (chat: Chat, event: Message, setMessages: SetMessagesType): void => {
  if (chat?.id === event?.chatId) {
    setMessages((prevState) => {
      const messageInList = prevState.find((m) => m.id === event.id);
      if (messageInList) {
        const index = prevState.indexOf(messageInList);
        prevState[index] = event;
      }
      return [...prevState];
    });
  }
};

export const handleMessageStatusesEvent = (chat: Chat, event: MessageStatuses, setMessages: SetMessagesType): void => {
  if (chat?.id === event?.chatId) {
    setMessages((prevState) => {
      const messageInList = prevState.find((m) => m.id === event.messageId);
      if (messageInList) {
        messageInList.statuses = event.statuses;
      }
      return [...prevState];
    });
  }
};

export const handleMessageReactionsEvent = (
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
