import * as React from 'react';
import {FC, ReactElement} from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import {CircularSpinner} from '../../loaders';

export type TooltipIconButtonProps = {
  action: (e?: React.MouseEvent<HTMLElement>) => void;
  icon: ReactElement;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
};

type Props = TooltipIconButtonProps;

export const TooltipIconButton: FC<Props> = ({action, icon, text, loading, disabled, show = true}: Props) => {
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
