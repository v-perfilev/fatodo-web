import * as React from 'react';
import {FC} from 'react';
import {Fab} from '@material-ui/core';
import {chatContentFooterSendButtonStyles} from './_styles';
import {SendMessageIcon} from '../../../../components/icons/SendMessageIcon';

type Props = {
  send: () => void;
};

const ChatContentFooterSendButton: FC<Props> = ({send}: Props) => {
  const classes = chatContentFooterSendButtonStyles();

  return (
    <Fab className={classes.root} size="small" color="primary" onClick={send}>
      <SendMessageIcon />
    </Fab>
  );
};

export default ChatContentFooterSendButton;
