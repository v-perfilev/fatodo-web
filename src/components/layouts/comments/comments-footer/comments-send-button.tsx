import * as React from 'react';
import {FC} from 'react';
import {Fab} from '@material-ui/core';
import {SendMessageIcon} from '../../../icons/send-message-icon';
import {commentsSendButtonStyles} from './_styles';

type Props = {
  send: () => void;
};

const CommentsSendButton: FC<Props> = ({send}: Props) => {
  const classes = commentsSendButtonStyles();

  return (
    <Fab className={classes.root} size="small" color="primary" onClick={send}>
      <SendMessageIcon />
    </Fab>
  );
};

export default CommentsSendButton;
