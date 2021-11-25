import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {Badge, BadgeOrigin, SvgIconProps} from '@material-ui/core';

type Props = PropsWithChildren<SvgIconProps> & {
  count: number;
  color?: 'primary' | 'secondary' | 'default' | 'error';
};

const BadgeWithoutIcon: FC<Props> = ({count, color}: Props) => {
  const style = {marginTop: 4, marginLeft: 24};
  const anchorOrigin = {vertical: 'top', horizontal: 'left'} as BadgeOrigin;
  const badgeColor = color || 'error';
  return <Badge style={style} badgeContent={count} color={badgeColor} max={500} anchorOrigin={anchorOrigin} />;
};

export default BadgeWithoutIcon;
