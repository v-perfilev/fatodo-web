import {ListItemDataProps} from '../../../../components/surfaces/virtualized-list/types';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import {ListChildComponentProps} from 'react-window';

export interface ChatControlItemDataProps extends ListItemDataProps<Chat> {
  chat: Chat;
  account: User;
  handleOnChatClick: (index: number) => () => void;
}

export type ChatControlItemProps = ListChildComponentProps<ChatControlItemDataProps>;
