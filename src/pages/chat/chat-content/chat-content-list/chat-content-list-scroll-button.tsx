import React, {FC} from 'react';
import {Fab} from '@material-ui/core';
import {ArrowDownIcon} from '../../../../components/icons/arrow-down-icon';
import {chatContentListScrollButtonStyles} from './_styles';

type Props = {
  show: boolean;
  scrollToBottom: () => void;
  highlighted: boolean;
};

const ChatContentListScrollButton: FC<Props> = ({show, scrollToBottom, highlighted}: Props) => {
  const classes = chatContentListScrollButtonStyles();

  const color = highlighted ? 'primary' : 'default';

  return show ? (
    <Fab className={classes.root} color={color} onClick={scrollToBottom} size="small">
      <ArrowDownIcon />
    </Fab>
  ) : null;
};

export default ChatContentListScrollButton;
