import React, {ComponentType, HTMLAttributes, ReactNode} from 'react';
import {Fade, Paper, Popper} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';

export type PopupContentComponentProps = {
  closePopup: () => void;
};

type HoverPopupPopperProps = HTMLAttributes<HTMLElement> &
  PopupContentComponentProps & {
    anchorEl: HTMLElement;
    ContentComponent: ComponentType<PopupContentComponentProps>;
  };

const HoverPopupPopper = ({
  anchorEl,
  ContentComponent,
  onMouseOver,
  onMouseLeave,
  closePopup,
}: HoverPopupPopperProps) => {
  const classes = hoverPopupPopperStyles();
  const isOpen = Boolean(anchorEl);

  return (
    <Popper
      className={classes.popper}
      open={isOpen}
      anchorEl={anchorEl}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      transition
    >
      {({TransitionProps}): ReactNode => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <ContentComponent closePopup={closePopup} />
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

const hoverPopupPopperStyles = makeStyles((theme: Theme) => ({
  popper: {
    zIndex: 10000,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

export default HoverPopupPopper;
