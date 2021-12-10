import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupViewUsersSkeletonStyles} from './_styles';
import {Skeleton} from '@material-ui/lab';

const GroupViewUsersSkeleton: FC = () => {
  const classes = groupViewUsersSkeletonStyles();

  return (
    <Box className={classes.root}>
      <Skeleton className={classes.skeleton} variant="rect" />
    </Box>
  );
};

export default GroupViewUsersSkeleton;
