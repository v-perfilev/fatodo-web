import React, {ReactElement} from 'react';
import {Box, MenuItem, SxProps} from '@mui/material';
import CircularSpinner from '../../../../src_old/components/loaders/CircularSpinner';

export type PopupMenuItemProps = {
  action: (e?: React.MouseEvent) => void;
  icon: ReactElement;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
};

const PopupMenuItem = ({action, icon, text, loading, disabled, show = true}: PopupMenuItemProps) => {
  return (
    show && (
      <MenuItem sx={itemStyles} onClick={action} disabled={disabled}>
        <Box sx={iconStyles}>{loading ? <CircularSpinner size="xs" /> : icon}</Box>
        {text}
      </MenuItem>
    )
  );
};

const itemStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
};

const iconStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: -0.5,
  marginRight: 1,
};

export default PopupMenuItem;
