import React, {FC} from 'react';
import {Fab} from '@material-ui/core';
import {chatContentScrollButtonStyles} from './_styles';
import {ArrowDownIcon} from '../../../common/icons/arrow-down-icon';

type Props = {
  show: boolean;
  highlighted: boolean;
  setShouldScrollDown: (value: boolean) => void;
};

const ChatContentScrollButton: FC<Props> = ({show, highlighted, setShouldScrollDown}: Props) => {
  const classes = chatContentScrollButtonStyles();

  const color = highlighted ? 'primary' : 'default';

  const scrollDown = (): void => {
    setShouldScrollDown(true);
  };

  return show ? (
    <Fab className={classes.root} color={color} onClick={scrollDown} size="medium">
      <ArrowDownIcon />
    </Fab>
  ) : null;
};

export default ChatContentScrollButton;
