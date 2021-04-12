import * as React from 'react';
import {FC, PropsWithChildren, useMemo} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';
import {iconWithMarginStyles} from './_styles';
import csx from 'classnames';

export type IconProps = PropsWithChildren<SvgIconProps> & {
  marginPosition?: 'top' | 'right' | 'bottom' | 'left';
  marginSize?: number;
};

type Props = IconProps;

export const Icon: FC<Props> = ({marginPosition, marginSize = 1, className, children, ...props}: Props) => {
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
