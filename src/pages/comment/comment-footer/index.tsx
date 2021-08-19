import React, {FC} from 'react';
import {Box, Container} from '@material-ui/core';
import {commentsFooterStyles} from './_styles';
import CommentInput from './comment-input';
import CommentSendButton from './comment-send-button';

const CommentFooter: FC = () => {
  const classes = commentsFooterStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <CommentInput send={console.log} setMessage={console.log} />
        <CommentSendButton send={console.log} />
      </Container>
    </Box>
  );
};

export default CommentFooter;
