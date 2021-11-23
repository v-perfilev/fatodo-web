import React, {FC, HTMLAttributes, ReactElement, useMemo} from 'react';
import {activePlaceholderStyles} from './_styles';
import {Box, Fade, Paper} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  action: () => void;
  icon: ReactElement;
  text: string;
  height?: number | string;
  setRef?: (element: HTMLDivElement) => void;
  variant?: 'elevation' | 'outlined';
  orientation?: 'horizontal' | 'vertical';
  size?: 'md' | 'sm';
};

export const ActivePlaceholder: FC<Props> = (props: Props) => {
  const {action, icon, text, height, setRef, variant, orientation, size} = props;
  const classes = activePlaceholderStyles();

  const classnames = csx(
    classes.root,
    {[classes.horizontal]: orientation === 'horizontal'},
    {[classes.small]: size === 'sm'}
  );

  const style = useMemo(() => {
    return {height: height || '100%'};
  }, [height]);

  const show = useMemo<boolean>(() => {
    return !height || height > 0;
  }, [height]);

  return (
    <Fade in={show}>
      <Paper square variant={variant} elevation={3} className={classnames} style={style} ref={setRef} onClick={action}>
        <Box className="icon">{icon}</Box>
        <Box className="text">{text}</Box>
      </Paper>
    </Fade>
  );
};
