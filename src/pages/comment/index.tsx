import React, {FC} from 'react';
import {commentsStyles} from './_styles';
import {Box} from '@material-ui/core';
import CommentFooter from './comment-footer';
import CommentList from './comment-list';
import {User} from '../../models/user.model';
import withAuthState from '../../shared/hocs/with-auth-state';

type Props = {
  targetId: string;
  account: User;
};

const Comments: FC<Props> = ({targetId, account}: Props) => {
  const classes = commentsStyles();

  return (
    <Box className={classes.root}>
      <CommentList targetId={targetId} account={account} />
      <CommentFooter />
    </Box>
  );
};

export default withAuthState(Comments);
