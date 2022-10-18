import React, {ReactNode} from 'react';
import {StackProps, Typography} from '@mui/material';
import FHStack from './FHStack';

type BoxWithIconProps = StackProps & {
  icon: ReactNode;
};

const BoxWithIcon = ({icon, children}: BoxWithIconProps) => {
  return (
    <FHStack spacing={1} flexGrow={0}>
      {icon}
      <Typography variant="body2">{children}</Typography>
    </FHStack>
  );
};

export default BoxWithIcon;
