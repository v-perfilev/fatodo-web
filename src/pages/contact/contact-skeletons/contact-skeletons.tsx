import React, {FC, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {CONTACT_SKELETONS_COUNT} from '../_constants';
import {contactSkeletonsStyles} from './_styles';
import ContactSkeleton from './contact-skeleton';

const ContactSkeletons: FC = () => {
  const classes = contactSkeletonsStyles();

  const indexArray = useMemo(() => Array.from(Array(CONTACT_SKELETONS_COUNT).keys()), []);
  const skeletons = indexArray.map((index) => <ContactSkeleton key={index} />);

  return <Box className={classes.root}>{skeletons}</Box>;
};

export default ContactSkeletons;
