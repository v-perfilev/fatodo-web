import * as React from 'react';
import {useContext} from 'react';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {Message} from '../../../models/message.model';

interface ChatDialogState {
  showChatAddMembersDialog: (chat: Chat) => void;
  showChatCreateDialog: () => void;
  showChatMembersDialog: (chat: Chat, users: User[]) => void;
  showChatRenameDialog: (chat: Chat, title: string) => void;
  showMessageReactionsDialog: (message: Message, users: User[]) => void;
  showMessageReadStatusesDialog: (message: Message, users: User[]) => void;
  showMessageEditDialog: (message: Message) => void;
  showDirectMessageDialog: (user: User) => void;
}

export const ChatDialogContext = React.createContext<ChatDialogState>(null);
export const useChatDialogContext = (): ChatDialogState => useContext(ChatDialogContext);
