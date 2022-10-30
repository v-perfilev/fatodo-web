import ArrowUpIcon from '../icons/ArrowUpIcon';
import {Fab, SxProps} from '@mui/material';
import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type ScrollCornerButtonProps = {
  show: boolean;
  action: () => void;
  down?: boolean;
  highlighted?: boolean;
  bottomPadding?: number;
};

const ScrollCornerButton = ({show, action, down, highlighted, bottomPadding = 0}: ScrollCornerButtonProps) => {
  return show ? (
    <Fab sx={fabStyles(bottomPadding)} size="medium" color={highlighted ? 'primary' : undefined} onClick={action}>
      {down ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </Fab>
  ) : null;
};

const fabStyles = (bottomPadding: number): SxProps => ({
  position: 'absolute',
  bottom: bottomPadding + 10,
  right: 10,
});

export default ScrollCornerButton;
