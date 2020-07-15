import * as React from 'react';
import {FC} from 'react';
import {groupsMenuStyles} from './_styles';
import {Drawer} from '@material-ui/core';

const GroupsMenu: FC = () => {
  const classes = groupsMenuStyles();

  return (
    <Drawer variant="permanent" className={classes.drawer} classes={{paper: classes.drawer}}>
      test
    </Drawer>
  );
};

export default GroupsMenu;
