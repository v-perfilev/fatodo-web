import {ListItemDataProps, ListItemProps} from '../../../common/surfaces/virtualized-list/types';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';

export interface ChatControlItemDataProps extends ListItemDataProps<Chat> {
  chat: Chat;
  account: User;
  handleOnChatClick: (index: number) => () => void;
}

export type ChatControlItemProps = ListItemProps<ChatControlItemDataProps>;
