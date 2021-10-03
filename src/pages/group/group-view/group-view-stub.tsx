import React, {FC} from 'react';
import {groupViewStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const GroupViewStub: FC = () => {
  const classes = groupViewStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('group:list.itemsNotFound')}</Box>;
};

export default GroupViewStub;
