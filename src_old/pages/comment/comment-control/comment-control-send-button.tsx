import * as React from 'react';
import {FC} from 'react';
import {Fab} from '@material-ui/core';
import {SendMessageIcon} from '../../../components/icons/SendMessageIcon';
import {commentControlSendButtonStyles} from './_styles';

type Props = {
  send: () => void;
};

const CommentControlSendButton: FC<Props> = ({send}: Props) => {
  const classes = commentControlSendButtonStyles();

  return (
    <Fab className={classes.root} size="small" color="primary" onClick={send}>
      <SendMessageIcon />
    </Fab>
  );
};

export default CommentControlSendButton;
