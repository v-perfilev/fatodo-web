import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {CircularSpinner} from '../../common/loaders';
import {messageControlLoaderStyles} from './_styles';

const MessageControlLoader: FC = () => {
  const classes = messageControlLoaderStyles();

  return (
    <Box className={classes.root}>
      <CircularSpinner size="sm" />
    </Box>
  );
};

export default MessageControlLoader;
