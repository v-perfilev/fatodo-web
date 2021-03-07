import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentLoaderStyles} from './_styles';
import {CircularSpinner} from '../../common/loaders';

const MessageContentLoader: FC = () => {
  const classes = messageContentLoaderStyles();

  return (
    <Box className={classes.root}>
      <CircularSpinner size="sm" />
    </Box>
  );
};

export default MessageContentLoader;
