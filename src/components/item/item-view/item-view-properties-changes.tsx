import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {Item} from '../../../models/item';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {itemViewPropertiesChangesStyles} from './_styles';
import {useTranslation} from 'react-i18next';

type Props = {
  item: Item
};

const ItemViewPropertiesChanges: FC<Props> = ({item}: Props) => {
  const classes = itemViewPropertiesChangesStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <LabeledBox label={t('items:labels.createdBy')}>
        <Box>{item.createdBy.username}</Box>
      </LabeledBox>
      <LabeledBox label={t('items:labels.createdAt')}>
        <Box>{item.createdAt}</Box>
      </LabeledBox>
      {item.updatedBy && (
        <LabeledBox label={t('items:labels.updatedBy')}>
          <Box>{item.updatedBy.username}</Box>
        </LabeledBox>
      )}
      {item.updatedAt && (
        <LabeledBox label={t('items:labels.updatedAt')}>
          <Box>{item.updatedAt}</Box>
        </LabeledBox>
      )}
    </Box>
  );
};

export default ItemViewPropertiesChanges;
