import {ListDataProps} from '../../components/surfaces/virtualized-list/types';
import {User} from '../../models/user.model';
import {ListChildComponentProps} from 'react-window';
import {Comment} from '../../models/comment.model';

export type CommentItemType = 'comment' | 'button' | 'stub';

export interface CommentItem {
  id: string;
  type: CommentItemType;
  comment?: Comment;
  parentId?: string;
}

export interface CommentListDataProps extends ListDataProps<CommentItem> {
  account: User;
  loadMoreItems: () => Promise<void>;
  loadMoreChildren: (parentId: string) => Promise<void>;
}

export type CommentItemProps = ListChildComponentProps<CommentListDataProps>;
