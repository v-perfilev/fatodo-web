import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {commentContainerStyles} from './_styles';
import {User} from '../../../models/user.model';
import {Comment} from '../../../models/comment.model';
import CommentItem from '../comment-item';

type Props = {
  comments: Comment[];
  loadMoreItems: () => Promise<void>;
  allLoaded: boolean;
  account: User;
  setReference: (comment: Comment) => void;
};

const CommentContainer: FC<Props> = ({comments, loadMoreItems, allLoaded, account, setReference}: Props) => {
  const classes = commentContainerStyles();

  return (
    <Box className={classes.root}>
      {comments.map((comment, index) => (
        <Box key={index}>
          <CommentItem comment={comment} account={account} setReference={setReference} />
        </Box>
      ))}

    </Box>
  );
};

export default CommentContainer;
