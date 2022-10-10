import React, {FC} from 'react';
import {contactOutcomingStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const ContactOutcomingStub: FC = () => {
  const classes = contactOutcomingStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('contact:outcoming.requestsNotFound')}</Box>;
};

export default ContactOutcomingStub;
