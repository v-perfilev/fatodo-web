import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';

const MessageContentList: FC = () => {
  const classes = messageContentListStyles();

  return (
    <Box className={classes.root}>
    </Box>
  );

};

export default MessageContentList;
