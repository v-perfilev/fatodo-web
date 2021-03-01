import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentHeaderStyles} from './_styles';

const MessageContentHeader: FC = () => {
  const classes = messageContentHeaderStyles();

  return (
    <Box className={classes.root}>
    </Box>
  );

};

export default MessageContentHeader;
