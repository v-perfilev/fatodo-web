import {ListDataProps} from '../../components/surfaces/virtualizedList/types';
import {User} from '../../models/user.model';
import {ListChildComponentProps} from 'react-window';
import {Comment} from '../../models/comment.model';

export interface CommentListDataProps extends ListDataProps<Comment> {
  account: User;
  setReference: (comment: Comment) => void;
}

export type CommentItemProps = ListChildComponentProps<CommentListDataProps>;
