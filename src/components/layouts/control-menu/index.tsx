import * as React from 'react';
import {FC} from 'react';
import {controlMenuStyles} from './_styles';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {Box} from '@material-ui/core';
import {LoadingButton} from '../../controls';

type Props = {
  menu: MenuElement[];
  disabled?: boolean;
};

const ControlMenu: FC<Props> = ({menu, disabled}: Props) => {
  const classes = controlMenuStyles();

  return (
    <Box className={classes.root}>
      {menu.map((action, index) => (
        <LoadingButton
          key={index}
          startIcon={action.icon}
          onClick={action.action}
          disabled={disabled}
          loading={action.loading}
          color={action.color || 'primary'}
          variant="outlined"
          size="small"
        >
          {action.text}
        </LoadingButton>
      ))}
    </Box>
  );
};

export default ControlMenu;
