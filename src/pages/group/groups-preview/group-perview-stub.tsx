import React, {FC} from 'react';
import {groupPreviewStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const GroupPreviewStub: FC = () => {
  const classes = groupPreviewStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('group:list.itemsNotFound')}</Box>;
};

export default GroupPreviewStub;
