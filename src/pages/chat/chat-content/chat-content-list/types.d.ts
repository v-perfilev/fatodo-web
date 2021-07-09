import {ListItemDataProps} from '../../../../components/surfaces/virtualized-list/types';
import {User} from '../../../../models/user.model';
import {MessageListItem} from '../../../../models/message.model';
import {ListChildComponentProps} from 'react-window';

export interface ChatContentItemDataProps extends ListItemDataProps<MessageListItem> {
  visibleItems: number[];
  account: User;
}

export type ChatContentItemProps = ListChildComponentProps<ChatContentItemDataProps>;
