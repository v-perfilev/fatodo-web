import ArrowUpIcon from '../icons/ArrowUpIcon';
import {ContainerProps, Fab, SxProps} from '@mui/material';
import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type ScrollCornerButtonProps = ContainerProps & {
  show: boolean;
  action: () => void;
  down?: boolean;
  highlighted?: boolean;
  bottomPadding?: number;
};

const ScrollCornerButton = ({show, action, down, highlighted, bottomPadding = 0}: ScrollCornerButtonProps) => {
  return show ? (
    <Fab sx={fabStyles(bottomPadding)} size="small" color={highlighted ? 'primary' : undefined} onClick={action}>
      {down ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </Fab>
  ) : null;
};

const fabStyles = (bottomPadding: number): SxProps => ({
  position: 'absolute',
  right: 10,
  bottom: bottomPadding + 10,
});

export default ScrollCornerButton;
