import React, {ReactElement} from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import CircularSpinner from '../loaders/CircularSpinner';

type TooltipIconButtonProps = {
  action: (e?: React.MouseEvent<HTMLElement>) => void;
  icon: ReactElement;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
};

const TooltipIconButton = ({action, icon, text, loading, disabled, show = true}: TooltipIconButtonProps) => {
  const iconElement = loading ? <CircularSpinner size="xs" /> : icon;

  return (
    show && (
      <Tooltip title={text}>
        <IconButton size="small" onClick={action} disabled={disabled}>
          {iconElement}
        </IconButton>
      </Tooltip>
    )
  );
};

export default TooltipIconButton;
