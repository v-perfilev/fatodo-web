import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {groupViewSkeletonUsersStyles} from './_styles';

const GroupViewSkeletonUsers: FC = () => {
  const classes = groupViewSkeletonUsersStyles();

  return (
    <Box className={classes.root}>
      <Skeleton className={classes.skeleton} variant="rect" />
    </Box>
  );
};

export default GroupViewSkeletonUsers;
