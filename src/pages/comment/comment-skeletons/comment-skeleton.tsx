import React, {FC} from 'react';
import {commentSkeletonStyles} from './_styles';
import {Box} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {Grower} from '../../../components/surfaces';

const CommentSkeleton: FC = () => {
  const classes = commentSkeletonStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.col1}>
        <Skeleton className={classes.skeleton1} variant="circle" />
      </Box>
      <Box className={classes.col2}>
        <Box className={classes.row1}>
          <Skeleton className={classes.skeleton2} variant="text" />
          <Grower />
          <Skeleton className={classes.skeleton3} variant="rect" />
        </Box>
        <Box className={classes.row2}>
          <Skeleton className={classes.skeleton4} variant="text" />
          <Skeleton className={classes.skeleton5} variant="text" />
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSkeleton;
