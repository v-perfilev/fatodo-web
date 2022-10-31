import React, {PropsWithChildren} from 'react';
import {Badge, Box, SvgIconProps, SxProps} from '@mui/material';

type BadgeWithoutIconProps = PropsWithChildren<SvgIconProps> & {
  count: number;
  color?: 'primary' | 'secondary' | 'default' | 'error';
};

const BadgeWithoutIcon = ({count, color}: BadgeWithoutIconProps) => {
  const badgeColor = color || 'error';

  return (
    <Box sx={containerStyles}>
      <Badge sx={badgeStyles} badgeContent={count} color={badgeColor} max={500} />
    </Box>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  width: 33,
};

const badgeStyles: SxProps = {
  top: -1,
};

export default BadgeWithoutIcon;
