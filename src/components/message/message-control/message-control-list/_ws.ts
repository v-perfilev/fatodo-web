import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import {ArrayUtils} from '../../../../shared/utils/array.utils';

type SetChatType = (chat: Chat) => void;
type SetChatsType = (value: (prevState: Chat[]) => Chat[]) => void;

export const handleChatNewEvent = (event: Chat, setChats: SetChatsType): void => {
  if (event) {
    setChats((prevState) => [...prevState, event]);
  }
};

export const handleChatUpdateEvent = (
  event: Chat,
  setChats: SetChatsType,
  chat: Chat,
  setChat: SetChatType,
  account: User
): void => {
  if (event) {
    if (event.members.includes(account.id)) {
      if (chat?.id === event.id) {
        setChat(event);
      }
      setChats((prevState) => {
        const chatInList = prevState.find((c) => c.id === event.id);
        if (chatInList) {
          const index = prevState.indexOf(chatInList);
          prevState[index] = event;
        }
        return [...prevState];
      });
    } else {
      if (chat?.id === event.id) {
        setChat(null);
      }
      setChats((prevState) => {
        const chatInList = prevState.find((c) => c.id === event.id);
        if (chatInList) {
          ArrayUtils.deleteItem(prevState, chatInList);
        }
        return [...prevState];
      });
    }
  }
};

export const handleChatLastMessageEvent = (event: Chat, setChats: SetChatsType): void => {
  if (event?.lastMessage) {
    setChats((prevState) => {
      const chatInList = prevState.find((c) => c.id === event.id);
      if (chatInList) {
        ArrayUtils.deleteItem(prevState, chatInList);
      }
      return [...prevState, event];
    });
  }
};
