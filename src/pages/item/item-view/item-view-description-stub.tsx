import React, {FC} from 'react';
import {itemViewDescriptionStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const ItemViewDescriptionStub: FC = () => {
  const classes = itemViewDescriptionStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('item:view.noDescription')}</Box>;
};

export default ItemViewDescriptionStub;
