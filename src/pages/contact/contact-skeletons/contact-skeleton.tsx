import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {Grower} from '../../../components/surfaces';
import {contactSkeletonStyles} from './_styles';

const ContactSkeleton: FC = () => {
  const classes = contactSkeletonStyles();

  return (
    <Box className={classes.root}>
      <Skeleton className={classes.skeleton1} variant="circle" />
      <Skeleton className={classes.skeleton2} variant="text" />
      <Grower />
      <Skeleton className={classes.skeleton3} variant="rect" />
      <Skeleton className={classes.skeleton4} variant="rect" />
    </Box>
  );
};

export default ContactSkeleton;
