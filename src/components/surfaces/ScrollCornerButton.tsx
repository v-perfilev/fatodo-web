import ArrowUpIcon from '../icons/ArrowUpIcon';
import {Fab, SxProps} from '@mui/material';
import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type ScrollCornerButtonProps = {
  show: boolean;
  action: () => void;
  down?: boolean;
  highlighted?: boolean;
};

const ScrollCornerButton = ({show, action, down, highlighted}: ScrollCornerButtonProps) => {
  return show ? (
    <Fab sx={fabStyles} size="medium" color={highlighted ? 'primary' : undefined} onClick={action}>
      {down ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </Fab>
  ) : null;
};

const fabStyles: SxProps = {
  position: 'absolute',
  bottom: 10,
  right: 10,
};

export default ScrollCornerButton;
