import {ListDataProps} from '../../../components/surfaces/virtualized-list/types';
import {User} from '../../../models/user.model';
import {Message} from '../../../models/message.model';
import {ListChildComponentProps} from 'react-window';

export type ChatItemType = 'event' | 'outcoming' | 'incoming' | null;

export type ChatItem = {
  message?: Message;
  date?: string;
};

export interface ChatListDataProps extends ListDataProps<ChatItem> {
  visibleItems: number[];
  account: User;
}

export type ChatItemProps = ListChildComponentProps<ChatListDataProps>;
