import React, {FC} from 'react';
import {User} from '../../../models/user.model';
import {Comment} from '../../../models/comment.model';
import CommentComment from '../comment-comment';

type Props = {
  comment: Comment;
  account: User;
};

const CommentItemComment: FC<Props> = ({comment, account}: Props) => {
  return <CommentComment comment={comment} account={account} />;
};

export default CommentItemComment;
