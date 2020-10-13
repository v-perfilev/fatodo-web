import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Fab, Theme, Tooltip, useMediaQuery} from '@material-ui/core';

type Props = {
  icon: ReactElement;
  action?: () => void;
  color?: 'primary' | 'secondary';
  tooltip?: string;
};

const AdditionalMenuButton: FC<Props> = ({icon, action, color, tooltip}: Props) => {
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const fabWithoutTooltip = (
    <Fab color={color} onClick={action}>
      {icon}
    </Fab>
  );

  const fabWithTooltip = (
    <Tooltip enterDelay={500} title={tooltip} placement={isBigDevice ? 'right' : 'top'}>
      {fabWithoutTooltip}
    </Tooltip>
  );

  return tooltip ? fabWithTooltip : fabWithoutTooltip;
};

export default AdditionalMenuButton;
