import React, {FC} from 'react';
import {contactRelationsStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const ContactRelationsStub: FC = () => {
  const classes = contactRelationsStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('contact:relations.relationsNotFound')}</Box>;
};

export default ContactRelationsStub;
