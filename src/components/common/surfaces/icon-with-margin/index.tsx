import * as React from 'react';
import {FC, PropsWithChildren, useMemo} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';
import {iconWithMarginStyles} from './_styles';
import csx from 'classnames';

export type IconWithMarginProps = PropsWithChildren<SvgIconProps> & {
  position?: 'top' | 'right' | 'bottom' | 'left';
  margin?: number;
};

type Props = IconWithMarginProps;

export const IconWithMargin: FC<Props> = ({position, margin = 1, className, children, ...props}: Props) => {
  const marginClassName = useMemo<string>(() => {
    const marginClasses = iconWithMarginStyles(margin);
    switch (position) {
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
  }, [position, margin]);

  const classNames = csx(marginClassName, className);

  return (
    <SvgIcon {...props} className={classNames}>
      {children}
    </SvgIcon>
  );
};
