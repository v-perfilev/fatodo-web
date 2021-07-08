import React, {FC} from 'react';
import {Box, Container} from '@material-ui/core';
import {commentsFooterStyles} from './_styles';
import CommentsInput from './comments-input';
import CommentsSendButton from './comments-send-button';


const CommentsFooter: FC = () => {
  const classes = commentsFooterStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <CommentsInput send={console.log} setMessage={console.log} />
        <CommentsSendButton send={console.log} />
      </Container>
    </Box>
  );
};

export default CommentsFooter;
