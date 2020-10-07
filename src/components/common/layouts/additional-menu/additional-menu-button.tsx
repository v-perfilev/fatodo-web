import * as React from 'react';
import {FC, forwardRef, ReactElement} from 'react';
import {Fab, Theme, Tooltip, useMediaQuery} from '@material-ui/core';

type Props = {
  icon: ReactElement;
  action?: () => void;
  color?: 'primary' | 'secondary';
  tooltip?: string;
};

const AdditionalMenuButton: FC<Props> = ({icon, action, color, tooltip}: Props) => {
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const FabWithoutTooltip = forwardRef(() => (
    <Fab color={color} onClick={action}>
      {icon}
    </Fab>
  ));

  const FabWithTooltip = forwardRef(() => (
    <Tooltip enterDelay={500} title={tooltip} placement={isBigDevice ? 'right' : 'top'}>
      <FabWithoutTooltip />
    </Tooltip>
  ));

  return tooltip !== null ? <FabWithTooltip /> : <FabWithoutTooltip />;
};

export default AdditionalMenuButton;
