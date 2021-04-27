import React, {FC} from 'react';
import {Fab} from '@material-ui/core';
import {chatContentScrollButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../common/icons/arrow-down-icon';

type Props = {
  show: boolean;
  highlighted: boolean;
  scrollToBottom: () => void;
};

const ChatContentScrollButton: FC<Props> = ({show, highlighted, scrollToBottom}: Props) => {
  const classes = chatContentScrollButtonStyles();

  const color = highlighted ? 'primary' : 'default';

  return show ? (
    <Fab className={classes.root} color={color} onClick={scrollToBottom} size="medium">
      <ArrowDownIcon />
    </Fab>
  ) : null;
};

export default ChatContentScrollButton;
