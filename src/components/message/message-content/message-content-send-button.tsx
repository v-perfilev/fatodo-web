import * as React from 'react';
import {FC} from 'react';
import {Fab} from '@material-ui/core';
import {messageContentSendButtonStyles} from './_styles';
import {SendMessageIcon} from '../../common/icons/send-message-icon';

type Props = {
  send: () => void;
};

const MessageContentSendButton: FC<Props> = ({send}: Props) => {
  const classes = messageContentSendButtonStyles();

  return (
    <Fab className={classes.root} size="medium" color="primary" onClick={send}>
      <SendMessageIcon />
    </Fab>
  );
};

export default MessageContentSendButton;
