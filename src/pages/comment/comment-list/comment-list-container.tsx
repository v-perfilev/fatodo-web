import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {commentListContainerStyles} from './_styles';
import {User} from '../../../models/user.model';
import {Comment} from '../../../models/comment.model';
import CommentItem from '../comment-item/comment-item';

type Props = {
  comments: Comment[];
  account: User;
  setReference: (comment: Comment) => void;
};

const CommentListContainer: FC<Props> = ({comments, account, setReference}: Props) => {
  const classes = commentListContainerStyles();

  return (
    <Box className={classes.root}>
      {comments.map((comment) => (
        <Box key={comment.id}>
          <CommentItem comment={comment} account={account} setReference={setReference} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentListContainer;
