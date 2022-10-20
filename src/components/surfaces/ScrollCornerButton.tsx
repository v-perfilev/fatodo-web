import ArrowUpIcon from '../icons/ArrowUpIcon';
import {Fab, SxProps} from '@mui/material';
import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type ScrollCornerButtonProps = {
  show: boolean;
  action: () => void;
  down?: boolean;
};

const ScrollCornerButton = ({show, action, down}: ScrollCornerButtonProps) => {
  return show ? (
    <Fab sx={fabStyles} size="medium" onClick={action}>
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
