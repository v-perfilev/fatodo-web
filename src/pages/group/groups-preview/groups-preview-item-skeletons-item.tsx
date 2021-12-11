import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupsPreviewItemSkeletonsItemStyles} from './_styles';
import {Skeleton} from '@material-ui/lab';

const GroupsPreviewItemSkeletonsItem: FC = () => {
  const classes = groupsPreviewItemSkeletonsItemStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.card}>
        <Skeleton className={classes.skeleton1} variant="rect" />
        <Box className={classes.middleBox}>
          <Skeleton className={classes.skeleton2} variant="rect" />
          <Skeleton className={classes.skeleton3} variant="rect" />
        </Box>
        <Skeleton className={classes.skeleton4} variant="rect" />
      </Box>
    </Box>
  );
};

export default GroupsPreviewItemSkeletonsItem;
