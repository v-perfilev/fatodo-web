import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../../components/surfaces';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {itemViewCommonStyles} from './_styles';
import ItemViewDescriptionStub from './item-view-description-stub';

const ItemViewDescription: FC = () => {
  const commonClasses = itemViewCommonStyles();
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  return item.description ? (
    <LabeledBox className={commonClasses.box} label={t('item:labels.description')}>
      <Box>{item.description}</Box>
    </LabeledBox>
  ) : (
    <ItemViewDescriptionStub />
  );
};

export default ItemViewDescription;
