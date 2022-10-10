import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Badge, BadgeOrigin, SvgIconProps} from '@material-ui/core';

type BadgeWithoutIconProps = PropsWithChildren<SvgIconProps> & {
  count: number;
  color?: 'primary' | 'secondary' | 'default' | 'error';
};

const BadgeWithoutIcon = ({count, color}: BadgeWithoutIconProps) => {
  const style = {marginTop: 4, marginLeft: 24};
  const anchorOrigin = {vertical: 'top', horizontal: 'left'} as BadgeOrigin;
  const badgeColor = color || 'error';
  return <Badge style={style} badgeContent={count} color={badgeColor} max={500} anchorOrigin={anchorOrigin} />;
};

export default BadgeWithoutIcon;
