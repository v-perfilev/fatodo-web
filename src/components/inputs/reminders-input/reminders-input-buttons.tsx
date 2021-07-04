import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';

type Props = {
  clearReminders: (event) => void;
};

export const RemindersInputButtons: FC<Props> = ({clearReminders}: Props) => {
  return (
    <IconButton size="small" onClick={clearReminders}>
      <CloseIcon />
    </IconButton>
  );
};
