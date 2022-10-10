import React, {PropsWithChildren, useMemo} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles, Theme} from '@material-ui/core/styles';

export type IconProps = PropsWithChildren<SvgIconProps> & {
  marginPosition?: 'top' | 'right' | 'bottom' | 'left';
  marginSize?: number;
};

const Icon = ({marginPosition, marginSize = 1, className, children, ...props}: IconProps) => {
  const marginClasses = iconWithMarginStyles(marginSize);

  const marginClassName = useMemo<string>(() => {
    switch (marginPosition) {
      case 'top':
        return marginClasses.top;
      case 'right':
        return marginClasses.right;
      case 'bottom':
        return marginClasses.bottom;
      case 'left':
        return marginClasses.left;
      default:
        return null;
    }
  }, [marginPosition, marginSize]);

  const classNames = csx(marginClassName, className);

  return (
    <SvgIcon {...props} className={classNames}>
      {children}
    </SvgIcon>
  );
};

const iconWithMarginStyles = makeStyles((theme: Theme) => ({
  top: (spacing: number): any => ({
    marginTop: theme.spacing(spacing),
  }),
  right: (spacing: number): any => ({
    marginRight: theme.spacing(spacing),
  }),
  bottom: (spacing: number): any => ({
    marginBottom: theme.spacing(spacing),
  }),
  left: (spacing: number): any => ({
    marginLeft: theme.spacing(spacing),
  }),
}));

export default Icon;
