import React, {FC} from 'react';
import {Fab} from '@material-ui/core';
import {chatContentScrollButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../common/icons/arrow-down-icon';

type Props = {
  show: boolean;
  scrollToBottom: () => void;
  highlighted: boolean;
};

const ChatContentScrollButton: FC<Props> = ({show, scrollToBottom, highlighted}: Props) => {
  const classes = chatContentScrollButtonStyles();

  const color = highlighted ? 'primary' : 'default';

  return show ? (
    <Fab className={classes.root} color={color} onClick={scrollToBottom} size="medium">
      <ArrowDownIcon />
    </Fab>
  ) : null;
};

export default ChatContentScrollButton;
