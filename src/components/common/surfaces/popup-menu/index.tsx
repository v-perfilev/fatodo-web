import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Fade, Menu, PopoverProps} from '@material-ui/core';

type Props = HTMLAttributes<HTMLElement> & PopoverProps;

export const PopupMenu: FC<Props> = ({children, className, ...props}: Props) => {
  return (
    <Menu TransitionComponent={Fade} MenuListProps={{disablePadding: true}} className={className} {...props}>
      {children}
    </Menu>
  );
};
