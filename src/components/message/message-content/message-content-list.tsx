import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';
import {Chat} from '../../../models/chat.model';

type Props = {
  chat: Chat;
};

const MessageContentList: FC<Props> = ({chat}: Props) => {
  const classes = messageContentListStyles();

  return (
    <Box className={classes.root}>
    </Box>
  );

};

export default MessageContentList;
