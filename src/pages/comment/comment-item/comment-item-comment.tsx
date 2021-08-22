import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {Comment} from '../../../models/comment.model';

type Props = {
  comment: Comment;
  account: User;
};

const CommentItemComment: FC<Props> = () => {
  return <Box>Test</Box>;
};

export default CommentItemComment;
