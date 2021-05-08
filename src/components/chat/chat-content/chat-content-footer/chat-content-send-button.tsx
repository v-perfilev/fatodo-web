import * as React from 'react';
import {FC} from 'react';
import {Fab} from '@material-ui/core';
import {chatContentSendButtonStyles} from './_styles';
import {SendMessageIcon} from '../../../common/icons/send-message-icon';

type Props = {
  send: () => void;
};

const ChatContentSendButton: FC<Props> = ({send}: Props) => {
  const classes = chatContentSendButtonStyles();

  return (
    <Fab className={classes.root} size="small" color="primary" onClick={send}>
      <SendMessageIcon />
    </Fab>
  );
};

export default ChatContentSendButton;
