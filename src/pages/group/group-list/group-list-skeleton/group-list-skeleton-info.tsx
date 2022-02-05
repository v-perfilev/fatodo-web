import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {groupListSkeletonInfoStyles} from './_styles';

const GroupListSkeletonsItem: FC = () => {
  const classes = groupListSkeletonInfoStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.badges}>
        <Skeleton className={classes.skeleton} variant="rect" />
      </Box>
    </Box>
  );
};

export default GroupListSkeletonsItem;
