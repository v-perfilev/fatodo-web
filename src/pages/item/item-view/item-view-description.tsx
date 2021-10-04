import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox, PageDivider} from '../../../components/surfaces';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {itemViewCommonStyles} from './_styles';
import ItemViewDescriptionStub from './item-view-description-stub';

const ItemViewDescription: FC = () => {
  const commonClasses = itemViewCommonStyles();
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  return item.description ? (
    <>
      <LabeledBox label={t('item:labels.description')} className={commonClasses.box}>
        <Box>{item.description}</Box>
      </LabeledBox>
      <PageDivider />
    </>
  ) : (
    <ItemViewDescriptionStub />
  );
};

export default ItemViewDescription;
