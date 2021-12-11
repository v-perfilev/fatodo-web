import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {contactOutcomingRequestSkeletonStyles} from './_styles';
import {Skeleton} from '@material-ui/lab';
import {Grower} from '../../../components/surfaces';

const ContactOutcomingItemSkeleton: FC = () => {
  const classes = contactOutcomingRequestSkeletonStyles();

  return (
    <Box className={classes.root}>
      <Skeleton className={classes.skeleton1} variant="circle" />
      <Skeleton className={classes.skeleton2} variant="text" />
      <Grower />
      <Skeleton className={classes.skeleton3} variant="rect" />
    </Box>
  );
};

export default ContactOutcomingItemSkeleton;
