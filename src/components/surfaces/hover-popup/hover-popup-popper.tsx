import * as React from 'react';
import {ComponentType, FC, HTMLAttributes, ReactNode} from 'react';
import {Fade, Paper, Popper} from '@material-ui/core';
import {hoverPopupPopperStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> &
  PopupContentComponentProps & {
    anchorEl: HTMLElement;
    ContentComponent: ComponentType<PopupContentComponentProps>;
  };

export type PopupContentComponentProps = {
  closePopup: () => void;
};

export const HoverPopupPopper: FC<Props> = (props: Props) => {
  const classes = hoverPopupPopperStyles();
  const {anchorEl, ContentComponent, onMouseOver, onMouseLeave, closePopup} = props;

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
