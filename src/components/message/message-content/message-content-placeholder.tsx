import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentPlaceholderStyles} from './_styles';

const MessageContentPlaceholder: FC = () => {
  const classes = messageContentPlaceholderStyles();

  return (
    <Box className={classes.root} />
  );
};

export default MessageContentPlaceholder;
