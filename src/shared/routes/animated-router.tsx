import * as React from 'react';
import {FC, ReactNode, useEffect, useState} from 'react';
import {Switch, useLocation} from 'react-router-dom';
import {animated, useTransition} from 'react-spring';
import {Box} from '@material-ui/core';
import {animatedRouterStyles} from './_styles';
import {useResize} from '../hooks/use-resize';

type Props = {
  children: ReactNode;
};

const AnimatedRouter: FC<Props> = ({children}: Props) => {
  const classes = animatedRouterStyles();
  const resize = useResize();
  const location = useLocation();
  const [ref, setRef] = useState<HTMLDivElement>();
  const [minHeight, setMinHeight] = useState<number | string>('100%');

  const transitions = useTransition(location, (location) => location.pathname, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
  });

  const setHeightAfterTimeout = (): void => {
    setTimeout(() => {
      if (ref) {
        setMinHeight(ref.clientHeight);
      }
    }, 500);
  };

  useEffect(() => {
    setHeightAfterTimeout();
  }, [ref, resize]);

  const heightStyle = {minHeight};

  return (
    <Box className={classes.root} style={heightStyle}>
      {transitions.map(({item, props, key}) => (
        <animated.div className={classes.animated} key={key} style={props} ref={setRef}>
          <Switch location={item}>{children}</Switch>
        </animated.div>
      ))}
    </Box>
  );
};

export default AnimatedRouter;
