import React, {FC} from 'react';
import {Box, Container} from '@material-ui/core';
import {commentControlStyles} from './_styles';
import CommentControlInput from './comment-control-input';
import CommentControlSendButton from './comment-control-send-button';

const CommentControl: FC = () => {
  const classes = commentControlStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <CommentControlInput send={console.log} setMessage={console.log} />
        <CommentControlSendButton send={console.log} />
      </Container>
    </Box>
  );
};

export default CommentControl;
