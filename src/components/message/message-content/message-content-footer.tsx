import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentFooterStyles, messageContentHeaderStyles} from './_styles';

const MessageContentFooter: FC = () => {
  const classes = messageContentFooterStyles();

  return (
    <Box className={classes.root}>
    </Box>
  );

};

export default MessageContentFooter;
