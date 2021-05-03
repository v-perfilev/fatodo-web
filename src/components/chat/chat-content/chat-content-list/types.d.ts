import {ListItemDataProps, ListItemProps} from '../../../common/surfaces/virtualized-list/types';
import {User} from '../../../../models/user.model';
import {MessageListItem} from '../../../../models/message.model';

export interface ChatContentItemDataProps extends ListItemDataProps<MessageListItem> {
  account: User;
}

export type ChatContentItemProps = ListItemProps<ChatContentItemDataProps>;
