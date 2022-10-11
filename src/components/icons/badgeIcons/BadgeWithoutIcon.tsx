import React, {PropsWithChildren} from 'react';
import {Badge, BadgeOrigin, SvgIconProps} from '@mui/material';

type BadgeWithoutIconProps = PropsWithChildren<SvgIconProps> & {
  count: number;
  color?: 'primary' | 'secondary' | 'default' | 'error';
};

const BadgeWithoutIcon = ({count, color}: BadgeWithoutIconProps) => {
  const anchorOrigin: BadgeOrigin = {vertical: 'top', horizontal: 'left'};
  const badgeColor = color || 'error';
  return (
    <Badge
      sx={{marginTop: 4, marginLeft: 24}}
      badgeContent={count}
      color={badgeColor}
      max={500}
      anchorOrigin={anchorOrigin}
    />
  );
};

export default BadgeWithoutIcon;
