import * as React from 'react';
import {ComponentType, FC, HTMLAttributes, ReactNode} from 'react';
import {Fade, Paper, Popper} from '@material-ui/core';
import {hoverPopupPopperStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  anchorEl: HTMLElement;
  ContentComponent: ComponentType;
};

export const HoverPopupPopper: FC<Props> = (props: Props) => {
  const classes = hoverPopupPopperStyles();
  const {anchorEl, ContentComponent, onMouseOver, onMouseLeave} = props;

  const isOpen = Boolean(anchorEl);

  return (
    <Popper open={isOpen} anchorEl={anchorEl} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} transition>
      {({TransitionProps}): ReactNode => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <ContentComponent />
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};
