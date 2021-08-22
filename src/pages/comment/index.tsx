import React, {FC} from 'react';
import {commentStyles} from './_styles';
import {Box} from '@material-ui/core';
import CommentControl from './comment-control';
import CommentList from './comment-list';
import {User} from '../../models/user.model';
import withAuthState from '../../shared/hocs/with-auth-state';
import {flowRight} from 'lodash';
import withCommentDialogs from '../../shared/hocs/with-dialogs/with-comment-dialogs';

type Props = {
  targetId: string;
  account: User;
};

const Comment: FC<Props> = ({targetId, account}: Props) => {
  const classes = commentStyles();

  return (
    <Box className={classes.root}>
      <CommentControl />
      <CommentList targetId={targetId} account={account} />
    </Box>
  );
};

export default flowRight([withCommentDialogs, withAuthState])(Comment);
