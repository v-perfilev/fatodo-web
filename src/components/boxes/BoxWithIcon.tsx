import React, {ReactElement} from 'react';
import {Typography, TypographyProps} from '@mui/material';
import FHStack from './FHStack';

type BoxWithIconProps = TypographyProps & {
  icon: ReactElement;
  size?: 'large' | 'medium' | 'small';
  fontSize?: number;
};

const BoxWithIcon = ({icon, size, fontSize, children, ...props}: BoxWithIconProps) => {
  const iconElement = React.cloneElement(icon, {fontSize: size});

  return (
    <FHStack spacing={1} flexGrow={0}>
      {iconElement}
      <Typography fontSize={fontSize} {...props}>
        {children}
      </Typography>
    </FHStack>
  );
};

export default BoxWithIcon;
