import React, {ReactElement} from 'react';
import {Box, MenuItem, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CircularSpinner from '../../loaders/CircularSpinner';

export type PopupMenuItemProps = {
  action: (e?: React.MouseEvent<HTMLElement>) => void;
  icon: ReactElement;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
};

const PopupMenuItem = ({action, icon, text, loading, disabled, show = true}: PopupMenuItemProps) => {
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

const popupMenuItemStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  firstElement: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(-0.5),
    marginRight: theme.spacing(1),
  },
}));

export default PopupMenuItem;
