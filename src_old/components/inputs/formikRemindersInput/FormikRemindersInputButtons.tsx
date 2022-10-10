import React from 'react';
import {IconButton} from '@material-ui/core';
import CloseIcon from '../../icons/CloseIcon';

type FormikRemindersInputButtonsProps = {
  clearReminders: (event: React.MouseEvent) => void;
};

const FormikRemindersInputButtons = ({clearReminders}: FormikRemindersInputButtonsProps) => {
  return (
    <IconButton size="small" onClick={clearReminders}>
      <CloseIcon />
    </IconButton>
  );
};

export default FormikRemindersInputButtons;
