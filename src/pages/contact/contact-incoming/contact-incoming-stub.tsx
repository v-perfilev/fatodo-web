import React, {FC} from 'react';
import {contactIncomingStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const ContactIncomingStub: FC = () => {
  const classes = contactIncomingStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('contact:incoming.requestsNotFound')}</Box>;
};

export default ContactIncomingStub;
