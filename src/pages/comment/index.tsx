import React, {FC, useState} from 'react';
import {commentStyles} from './_styles';
import {Box, Container} from '@material-ui/core';
import CommentControl from './comment-control';
import CommentList from './comment-list';
import {User} from '../../models/user.model';
import withAuthState from '../../shared/hocs/with-auth-state';
import {flowRight} from 'lodash';
import withCommentDialogs from '../../shared/hocs/with-dialogs/with-comment-dialogs';
import {Comment} from '../../models/comment.model';

type Props = {
  targetId: string;
  account: User;
};

const Comment: FC<Props> = ({targetId, account}: Props) => {
  const classes = commentStyles();
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <CommentControl
          targetId={targetId}
          account={account}
          reference={reference}
          clearReference={clearReference}
          addComment={console.log}
        />
        <CommentList targetId={targetId} account={account} setReference={setReference} />
      </Container>
    </Box>
  );
};

export default flowRight([withCommentDialogs, withAuthState])(Comment);
