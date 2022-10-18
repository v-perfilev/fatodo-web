import React from 'react';
import ArrowDownIcon from './ArrowDownIcon';
import {IconProps} from '../surfaces/Icon';
import {animated, useSpring} from 'react-spring';

type CollapsedIconProps = IconProps & {
  collapsed: boolean;
};

const CollapsedIcon = ({collapsed, ...props}: CollapsedIconProps) => {
  const style = useSpring({transform: collapsed ? 'rotate(360deg)' : 'rotate(180deg)'});

  return (
    <animated.div style={{display: 'flex', ...style}}>
      <ArrowDownIcon {...props} />
    </animated.div>
  );
};

export default CollapsedIcon;
