import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {Item} from '../../../models/item';
import LabeledBox from '../../common/page-layouts/labeled-box';
import PaperBox from '../../common/page-layouts/paper-box';
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
        <PaperBox>{item.createdBy.username}</PaperBox>
      </LabeledBox>
      <LabeledBox label={t('items:labels.createdAt')}>
        <PaperBox>{item.createdAt}</PaperBox>
      </LabeledBox>
      {item.updatedBy && (
        <LabeledBox label={t('items:labels.updatedBy')}>
          <PaperBox>{item.updatedBy.username}</PaperBox>
        </LabeledBox>
      )}
      {item.updatedAt && (
        <LabeledBox label={t('items:labels.updatedAt')}>
          <PaperBox>{item.updatedAt}</PaperBox>
        </LabeledBox>
      )}
    </Box>
  );
};

export default ItemViewPropertiesChanges;
