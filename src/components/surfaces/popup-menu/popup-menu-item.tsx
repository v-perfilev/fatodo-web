import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Box, MenuItem} from '@material-ui/core';
import {CircularSpinner} from '../../loaders';
import {popupMenuItemStyles} from './_styles';

export type PopupMenuItemProps = {
  action: (e?: React.MouseEvent<HTMLElement>) => void;
  icon: ReactElement;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
};

type Props = PopupMenuItemProps;

export const PopupMenuItem: FC<Props> = ({action, icon, text, loading, disabled, show = true}: Props) => {
  const classes = popupMenuItemStyles();

  const spinnerElement = (
    <Box className={classes.firstElement}>
      <CircularSpinner size="xs" />
    </Box>
  );

  const iconElement = <Box className={classes.firstElement}>{icon}</Box>;

  return (
    show && (
      <MenuItem className={classes.item} onClick={action} disabled={disabled}>
        {loading && spinnerElement}
        {!loading && iconElement}
        {text}
      </MenuItem>
    )
  );
};
