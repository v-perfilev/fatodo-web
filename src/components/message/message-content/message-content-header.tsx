import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentHeaderStyles} from './_styles';
import {Chat} from '../../../models/chat.model';

type Props = {
  chat: Chat;
};

const MessageContentHeader: FC<Props> = ({chat}: Props) => {
  const classes = messageContentHeaderStyles();

  return (
    <Box className={classes.root}>
    </Box>
  );

};

export default MessageContentHeader;
