import * as React from 'react';
import {useContext} from 'react';
import {User} from '../../../models/user.model';
import {Comment} from '../../../models/comment.model';

interface CommentDialogState {
  showCommentReactionsDialog: (comment: Comment, users: User[]) => void;
}

export const CommentDialogContext = React.createContext<CommentDialogState>(null);
export const useCommentDialogContext = (): CommentDialogState => useContext(CommentDialogContext);
