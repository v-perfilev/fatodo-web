import * as React from 'react';
import {FC} from 'react';
import {controlMenuStyles} from './_styles';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import {Box, Button} from '@material-ui/core';

type Props = {
  menu: MenuElement[];
};

const ControlMenu: FC<Props> = ({menu}) => {
  const classes = controlMenuStyles();

  return (
    <Box className={classes.root}>
      {menu.map((action, index) => (
        <Button key={index} startIcon={action.icon} onClick={action.action} color="primary" variant="outlined">
          {action.text}
        </Button>
      ))}
    </Box>
  );
};

export default ControlMenu;
