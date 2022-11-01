import React, {HTMLAttributes, ReactElement} from 'react';
import {Fade, Paper, Popper, SxProps} from '@mui/material';

type HoverPopupPopperProps = HTMLAttributes<HTMLDivElement> & {
  anchorEl: HTMLElement;
  content: ReactElement;
};

const HoverPopupPopper = ({anchorEl, content, onMouseOver, onMouseLeave}: HoverPopupPopperProps) => {
  const isOpen = Boolean(anchorEl);

  return (
    <Popper
      sx={popperStyles}
      open={isOpen}
      anchorEl={anchorEl}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      transition
    >
      {({TransitionProps}) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={paperStyles}>{content}</Paper>
        </Fade>
      )}
    </Popper>
  );
};

const popperStyles: SxProps = {
  zIndex: 10000,
};

const paperStyles: SxProps = {
  padding: 2,
  margin: 1,
};

export default HoverPopupPopper;
