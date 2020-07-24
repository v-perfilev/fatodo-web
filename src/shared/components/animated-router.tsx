import * as React from 'react';
import {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import {Switch, useLocation} from 'react-router-dom';
import {animated, useTransition} from 'react-spring';
import {Box} from '@material-ui/core';
import {animatedRouterStyles} from './_styles';
import {useResize} from '../hooks/use-resize';

type Props = PropsWithChildren<any>;

const AnimatedRouter: FC<Props> = ({children}: Props) => {
  const classes = animatedRouterStyles();

  const resize = useResize();
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const location = useLocation();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
  });

  useEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current && ref.current.clientHeight]);

  useEffect(() => {
    if (ref.current && ref.current.clientHeight) {
      setTimeout(() => {
        setHeight(ref.current.clientHeight);
      }, 500);
    }
  }, [resize]);

  const heightStyle = {height};

  return (
    <Box className={classes.root} style={heightStyle}>
      {transitions.map(({item, props, key}) => (
        <animated.div className={classes.animated} key={key} style={props} ref={ref}>
          <Switch location={item}>{children}</Switch>
        </animated.div>
      ))}
    </Box>
  );
};

export default AnimatedRouter;
