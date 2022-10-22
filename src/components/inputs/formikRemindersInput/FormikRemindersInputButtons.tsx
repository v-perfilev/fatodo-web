import React from 'react';
import CloseIcon from '../../icons/CloseIcon';
import {IconButton} from '@mui/material';

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
